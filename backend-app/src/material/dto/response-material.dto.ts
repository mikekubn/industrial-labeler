import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseMaterialDto {
  @Expose()
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Material id',
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    example: 'MATERIAL_01',
    description: 'Material name',
  })
  name: string;
}
