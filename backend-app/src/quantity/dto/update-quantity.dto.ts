import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateQuantityDto {
  @ApiProperty({
    type: Number,
    example: 100,
    description: 'Input quantity of the item',
  })
  @IsNotEmpty()
  @IsNumber()
  input: number;

  @ApiProperty({
    type: Number,
    example: 100,
    description: 'Output quantity of the item',
  })
  @IsNotEmpty()
  @IsNumber()
  output: number;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Is marked quantity',
  })
  @IsNotEmpty()
  @IsBoolean()
  isMarked: boolean;
}
