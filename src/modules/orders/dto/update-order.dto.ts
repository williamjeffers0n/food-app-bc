import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PaymentStatus } from 'src/database/enums/payment-status.enum';
import { Status } from 'src/database/enums/status.enum';

export class UpdateOrderDto {

  @IsNumber()
  @IsOptional()
  readonly totalAmount?: number;
  @IsNumber()
  @IsOptional()
  readonly totalItems?: number;
  @IsNumber()
  @IsOptional()
  readonly restaurantId?: number;
  @IsNumber()
  @IsOptional()
  readonly userId?: number;
  @IsString()
  @IsOptional()
  readonly status?: Status = Status.PLACED;
  @IsString()
  @IsOptional()
  readonly paymentStatus?: PaymentStatus = PaymentStatus.NOT_PAID;
  @IsString()
  @IsOptional()
  readonly createdAt?: string;
  @IsString()
  @IsOptional()
  readonly updatedAt?: string;

}
