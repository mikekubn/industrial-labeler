import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    type: 'string',
    example: 'PR_01',
    description: 'Item name',
  })
  @IsString({ message: 'Item name must be a string' })
  @IsNotEmpty({ message: 'Item name is required' })
  name: string;
}
