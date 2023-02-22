import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateItemDto {

  @IsOptional()
  @IsString()
  readonly name?: string;
  @IsOptional()
  @IsString()
  readonly description?: string;
  @IsOptional()
  @IsString()
  readonly photoUrl?: string;

}
