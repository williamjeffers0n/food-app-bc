import { IsOptional, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description?: string;
  @IsString()
  readonly address?: string;
  @IsOptional()
  @IsString()
  readonly photoUrl?: string;
  @IsString()
  readonly createdAt?: string;
  @IsString()
  readonly updatedAt?: string;
}
