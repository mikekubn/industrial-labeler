import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecordDto {
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Material id',
  })
  @IsString({ message: 'Material must be a string' })
  @IsNotEmpty({ message: 'Material is required' })
  materialId: string;

  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Item id',
  })
  @IsString({ message: 'Item must be a string' })
  @IsNotEmpty({ message: 'Item is required' })
  itemId: string;
}
