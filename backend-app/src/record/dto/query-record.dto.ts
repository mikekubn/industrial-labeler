import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';
import { TransformQueryToValidDate } from 'src/decorators/query-valid-date.decorator';

export class QueryRecordDto {
  @IsOptional()
  @IsDate()
  @TransformQueryToValidDate()
  @ApiProperty({
    example: 1707249889000,
    description: 'From date (ISO string or timestamp)',
  })
  from: Date;

  @IsOptional()
  @IsDate()
  @TransformQueryToValidDate()
  @ApiProperty({
    example: 1707249889000,
    description: 'To date (ISO string or timestamp)',
  })
  to: Date;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @ApiProperty({
    example: true,
    description: 'Is marked',
  })
  isMarked: boolean;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    example: 1,
    description: 'Page number',
  })
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    example: 10,
    description: 'Limit number',
  })
  limit: number = 10;
}
