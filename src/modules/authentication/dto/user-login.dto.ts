import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  readonly username?: string;
  @IsString()
  readonly email?: string;
  @IsString()
  readonly password?: string;
  @IsString()
  readonly type?: string;
}
