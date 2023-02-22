import { IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description?: string;
  @IsOptional()
  @IsString()
  readonly photoUrl?: string;
  @IsString()
  readonly createdAt?: string;
  @IsString()
  readonly updatedAt?: string;
}
