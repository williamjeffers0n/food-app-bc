import {
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateRestaurantDto {

  @IsString()
  @IsOptional()
  readonly name: string;
  @IsString()
  readonly description?: string;
  @IsOptional()
  @IsString()
  readonly photoUrl?: string;
  @IsString()
  @IsOptional()
  readonly address?: string;
  @IsOptional()
  @IsString()
  readonly createdAt?: string;
  @IsOptional()
  @IsString()
  readonly updatedAt?: string

}
