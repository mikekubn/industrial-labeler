import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DeleteResponseDto {
  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Indicates whether the deletion was successful',
  })
  success: boolean;
}
