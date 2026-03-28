import { IsNotEmpty, IsString } from 'class-validator';

export class UserRequestTokenDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
