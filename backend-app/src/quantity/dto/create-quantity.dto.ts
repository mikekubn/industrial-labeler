import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuantityDto {
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Record ID',
  })
  @IsNotEmpty()
  @IsString()
  recordId: string;

  @ApiProperty({
    type: Number,
    example: 100,
    description: 'Input quantity of the item',
  })
  @IsNotEmpty()
  @IsNumber()
  input: number;
}
