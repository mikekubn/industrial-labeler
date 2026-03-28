import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({
    type: 'string',
    example: 'MATERIAL_01',
    description: 'Material name',
  })
  @IsString({ message: 'Material name must be a string' })
  @IsNotEmpty({ message: 'Material name is required' })
  name: string;
}
