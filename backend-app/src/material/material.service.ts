import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RecordService } from '../record/record.service';

import { CreateMaterialDto } from './dto/create-material.dto';
import {
  MaterialAlreadyExistsException,
  MaterialHasAnyRecordException,
  MaterialNotFoundException,
} from './http-exception/material-exception';

@Injectable()
export class MaterialService {
  private readonly logger = new Logger(MaterialService.name);

  constructor(
    private readonly prisma: DatabaseService,
    private readonly recordService: RecordService,
  ) {}

  public async create(data: CreateMaterialDto) {
    const { name } = data;

    const isMaterialExist = await this.prisma.material.findUnique({
      where: {
        name,
      },
    });

    if (isMaterialExist) {
      throw new MaterialAlreadyExistsException();
    }

    const material = await this.prisma.material.create({
      data: { name },
    });

    this.logger.log(`Created material: ${JSON.stringify(material)}`);

    return material;
  }

  public findAll() {
    return this.prisma.material.findMany();
  }

  public findOne(id: string) {
    return this.prisma.material.findUnique({ where: { id } });
  }

  public async remove(id: string) {
    const material = await this.findOne(id);

    if (!material) {
      throw new MaterialNotFoundException();
    }

    const hasMaterialAnyRecord =
      await this.recordService.findRecordByMaterialId(id);

    if (hasMaterialAnyRecord) {
      throw new MaterialHasAnyRecordException();
    }

    return this.prisma.material.delete({
      where: { id: material.id, name: material.name },
    });
  }
}
