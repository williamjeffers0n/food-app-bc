import {
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Status } from '../../../database/enums/status.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly phoneExt?: string;
  @IsString()
  @IsOptional()
  readonly phone?: string;
  @IsString()
  @IsOptional()
  readonly fullName?: string;
  @IsString()
  @IsOptional()
  @Length(6, 7)
  password?: string;
  @IsString()
  @IsOptional()
  passwordSalt?: string;
  @IsString()
  @IsOptional()
  passwordHash?: string;
  @IsString()
  @IsOptional()
  readonly email?: string;
  @IsString()
  @IsOptional()
  readonly status?: Status;
  @IsString()
  @IsOptional()
  readonly address?: string;
  @IsOptional()
  @IsString()
  readonly createdAt?: string;
  @IsOptional()
  @IsString()
  readonly updatedAt?: string;
  @IsString()
  @IsOptional()
  readonly userName?: string;

}
