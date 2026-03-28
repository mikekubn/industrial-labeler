import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export class UpdateUserRoleDto {
  @ApiProperty({
    type: 'string',
    example: 'username',
    description: 'Username',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'user',
    description: 'Role',
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
