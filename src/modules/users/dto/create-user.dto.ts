import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly uid?: string;
  @IsString()
  readonly fullName: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly address?: string;
  @IsString()
  readonly phoneExt?: string;
  @IsString()
  readonly phone?: string;
  @IsString()
  readonly username: string;
  @IsString()
  password: string;
  @IsString()
  passwordSalt?: string;
  @IsString()
  passwordHash?: string;
  @IsString()
  readonly createdAt?: string;
  @IsString()
  readonly updatedAt?: string;
 
 

}
