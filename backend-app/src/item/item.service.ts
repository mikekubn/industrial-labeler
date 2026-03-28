import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RecordService } from '../record/record.service';

import { CreateItemDto } from './dto/create-item.dto';
import {
  ItemAlreadyExistsException,
  ItemHasAnyRecordException,
  ItemNotFoundException,
} from './http-exception/item-exception';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(
    private readonly prisma: DatabaseService,
    private readonly recordService: RecordService,
  ) {}

  async create(data: CreateItemDto) {
    const { name } = data;

    const isItemExist = await this.prisma.item.findUnique({
      where: {
        name,
      },
    });

    if (isItemExist) {
      throw new ItemAlreadyExistsException();
    }

    const item = await this.prisma.item.create({ data: { name } });

    this.logger.log(`Created item: ${JSON.stringify(item)}`);

    return item;
  }

  public findAll() {
    return this.prisma.item.findMany();
  }

  public async findOne(id: string) {
    const item = await this.prisma.item.findUnique({ where: { id } });

    if (!item) {
      throw new ItemNotFoundException();
    }

    return item;
  }

  public async remove(id: string) {
    const item = await this.findOne(id);

    if (!item) {
      throw new ItemNotFoundException();
    }

    const hasItemAnyRecord = await this.recordService.findRecordByItemId(
      item.id,
    );

    if (hasItemAnyRecord) {
      throw new ItemHasAnyRecordException();
    }

    return this.prisma.item.delete({ where: { id: item.id, name: item.name } });
  }
}
