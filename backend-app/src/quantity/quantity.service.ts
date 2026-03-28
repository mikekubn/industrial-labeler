import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

import { Prisma } from 'generated/prisma/client';
import { CreateQuantityDto } from './dto/create-quantity.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { convertQuantityObjectToDto } from './factories/convert-quantity';
import { QuantityNotFoundException } from './http-exception/quantity-exception';

@Injectable()
export class QuantityService {
  private readonly logger = new Logger(QuantityService.name);
  constructor(private readonly prisma: DatabaseService) {}

  public async create(data: CreateQuantityDto) {
    const quantity = await this.prisma.quantity.create({
      data: {
        input: new Prisma.Decimal(data.input),
        output: new Prisma.Decimal(0),
        stateCode: 'CREATED',
        isMarked: false,
        record: {
          connect: {
            id: data.recordId,
          },
        },
      },
    });

    this.logger.log(`Created quantity: ${JSON.stringify(quantity)}`);

    const payload = convertQuantityObjectToDto(quantity);

    this.logger.log(
      `Created quantity converted payload: ${JSON.stringify(payload)}`,
    );

    return payload;
  }

  public async update(id: string, data: UpdateQuantityDto) {
    const isCompleted = data.output > 0;
    const stateCode = isCompleted ? 'COMPLETED' : 'CREATED';

    const quantity = await this.prisma.quantity.update({
      where: {
        id,
      },
      data: {
        input: new Prisma.Decimal(data.input),
        output: new Prisma.Decimal(data.output),
        stateCode,
        isMarked: data.isMarked,
      },
    });

    this.logger.log(`Updated quantity: ${JSON.stringify(quantity)}`);

    const payload = convertQuantityObjectToDto(quantity);

    this.logger.log(
      `Updated quantity converted payload: ${JSON.stringify(payload)}`,
    );

    return payload;
  }

  public async findById(id: string) {
    const quantity = await this.prisma.quantity.findUnique({
      where: {
        id,
      },
    });

    if (!quantity) {
      throw new QuantityNotFoundException();
    }

    return convertQuantityObjectToDto(quantity);
  }

  public async delete(id: string) {
    let success = false;
    const isQuantityExist = await this.prisma.quantity.findUnique({
      where: {
        id,
      },
    });

    if (!isQuantityExist) {
      throw new QuantityNotFoundException();
    }

    try {
      await this.prisma.quantity.delete({
        where: {
          id,
        },
      });

      success = true;
    } catch (e: unknown) {
      success = false;
      console.log(e);
      throw new QuantityNotFoundException();
    }

    return {
      success,
    };
  }
}
