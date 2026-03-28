import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { Status } from 'generated/prisma/enums';

@Exclude()
export class ResponseQuantityDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Quantity ID',
  })
  id: string;

  @Expose()
  @ApiProperty({
    enum: Status,
    example: Status.CREATED,
    description: 'Status of the quantity',
  })
  stateCode: Status;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Is the quantity marked?',
  })
  isMarked: boolean;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 100,
    description: 'Input quantity of the item',
  })
  input: number;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 100,
    description: 'Output quantity of the item',
  })
  output: number;
}
