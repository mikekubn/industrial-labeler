import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseItemDto {
  @Expose()
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Item id',
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    example: 'PR_01',
    description: 'Item name',
  })
  name: string;

  createdAt: Date;

  updatedAt: Date;
}
