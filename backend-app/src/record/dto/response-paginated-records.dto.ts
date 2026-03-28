import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose, Type } from 'class-transformer';
import { ResponseRecordDto } from './response-record.dto';

@Exclude()
export class ResponsePaginatedRecordsDto {
  @Expose()
  @Type(() => ResponseRecordDto)
  @ApiProperty({
    type: [ResponseRecordDto],
    isArray: true,
    description: 'Records',
  })
  data: ResponseRecordDto[];

  @Expose()
  @ApiProperty({
    type: 'number',
    example: 10,
    description: 'Total records',
  })
  total: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Current page',
  })
  page: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    example: 10,
    description: 'Limit',
  })
  limit: number;

  @Expose()
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Total pages',
  })
  totalPages: number;
}
