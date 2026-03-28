import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseItemDto } from 'src/item/dto/response-item.dto';
import { ResponseMaterialDto } from 'src/material/dto/response-material.dto';
import { ResponseQuantityDto } from 'src/quantity/dto/response-quantity.dto';

@Exclude()
export class ResponseRecordDto {
  @Expose()
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Record id',
  })
  id: string;

  @Expose()
  @Type(() => ResponseMaterialDto)
  @ApiProperty({
    type: ResponseMaterialDto,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Material id',
  })
  material: ResponseMaterialDto;

  @Expose()
  @Type(() => ResponseItemDto)
  @ApiProperty({
    type: ResponseItemDto,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Item id',
  })
  item: ResponseItemDto;

  @Expose()
  @Type(() => ResponseQuantityDto)
  @ApiProperty({
    type: ResponseQuantityDto,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Quantity id',
  })
  quantities: ResponseQuantityDto[];
}
