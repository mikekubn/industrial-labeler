import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ItemNotFoundException } from '../item/http-exception/item-exception';
import { MaterialNotFoundException } from '../material/http-exception/material-exception';

import { endOfDay, startOfDay } from 'date-fns';
import { Prisma } from 'generated/prisma/client';
import { convertQuantityObjectToDto } from 'src/quantity/factories/convert-quantity';
import { CreateRecordDto } from './dto/create-record.dto';
import { QueryRecordDto } from './dto/query-record.dto';
import {
  RecordAlreadyExistsException,
  RecordHasQuantitiesException,
  RecordNotFoundException,
} from './http-exception/record-exception';

@Injectable()
export class RecordService {
  private readonly logger = new Logger(RecordService.name);

  constructor(private readonly prisma: DatabaseService) {}

  public async create(data: CreateRecordDto) {
    const { materialId, itemId } = data;

    const isItemExist = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });

    const isMaterialExist = await this.prisma.material.findUnique({
      where: {
        id: materialId,
      },
    });

    if (!isItemExist) {
      throw new ItemNotFoundException();
    }

    if (!isMaterialExist) {
      throw new MaterialNotFoundException();
    }

    const isRecordExist = await this.prisma.record.findUnique({
      where: {
        materialId,
        itemId,
      },
    });

    if (isRecordExist) {
      throw new RecordAlreadyExistsException();
    }

    try {
      const record = await this.prisma.record.create({
        data: {
          materialId,
          itemId,
        },
      });

      this.logger.log(`Created record: ${JSON.stringify(record)}`);

      return record;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          this.logger.error(`Unique constraint error code: ${e.code}`);
          throw new RecordAlreadyExistsException();
        }
      }
    }
  }

  public async findAll(query: QueryRecordDto) {
    const { from, to, isMarked, page = 1, limit = 10 } = query;

    const fromBound = startOfDay(from);
    const toBound = endOfDay(to);

    this.logger.log(
      `Finding records from ${fromBound.toISOString()} to ${toBound.toISOString()} (inclusive days) and isMarked: ${isMarked}`,
    );

    const where: Prisma.RecordWhereInput = {
      createdAt: {
        gte: fromBound,
        lte: toBound,
      },
      quantities: {
        some: {
          ...(isMarked === true ? { isMarked: true } : {}),
          createdAt: {
            gte: fromBound,
            lte: toBound,
          },
        },
      },
    };

    const include: Prisma.RecordInclude = {
      item: true,
      material: true,
      quantities: {
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          ...(isMarked === true ? { isMarked: true } : {}),
          createdAt: {
            gte: fromBound,
            lte: toBound,
          },
        },
      },
    };

    const [records, total] = await this.prisma.$transaction([
      this.prisma.record.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where,
        include,
      }),
      this.prisma.record.count({ where }),
    ]);

    this.logger.log(
      `Found records: ${JSON.stringify(records)}, total: ${total}`,
    );

    const payload = records.map((record) => {
      return {
        ...record,
        quantities: record.quantities.map((quantity) =>
          convertQuantityObjectToDto(quantity),
        ),
      };
    });

    const totalPages = Math.ceil(total / limit);

    this.logger.log(
      `Total pages: ${totalPages}, total: ${total}, page: ${page}, limit: ${limit}`,
    );

    return {
      data: payload,
      total,
      page,
      limit,
      totalPages,
    };
  }

  public async findOne(id: string) {
    const record = await this.prisma.record.findUnique({
      where: {
        id,
      },
      include: {
        item: true,
        material: true,
        quantities: true,
      },
    });

    if (!record) {
      throw new RecordNotFoundException();
    }

    const payload = {
      ...record,
      quantities: record.quantities.map((quantity) =>
        convertQuantityObjectToDto(quantity),
      ),
    };

    return payload;
  }

  public async delete(id: string) {
    const isRecordExist = await this.prisma.record.findUnique({
      where: {
        id,
      },
    });

    if (!isRecordExist) {
      throw new RecordNotFoundException();
    }

    const hasRecordQuantities = await this.prisma.quantity.count({
      where: {
        recordId: id,
      },
    });

    if (hasRecordQuantities > 0) {
      throw new RecordHasQuantitiesException();
    }

    const record = await this.prisma.record.delete({
      where: {
        id,
      },
    });

    return record;
  }

  public async findRecordByItemId(
    itemId: string,
    include: Prisma.RecordInclude = {
      item: false,
      material: false,
    },
  ) {
    const record = await this.prisma.record.findUnique({
      where: {
        itemId,
      },
      include,
    });

    if (!record) {
      throw new RecordNotFoundException();
    }

    return record;
  }

  public async findRecordByMaterialId(materialId: string) {
    const record = await this.prisma.record.findFirst({
      where: {
        materialId,
      },
    });

    return record;
  }
}
