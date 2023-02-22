import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PaymentStatus } from 'src/database/enums/payment-status.enum';
import { Status } from 'src/database/enums/status.enum';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsNumber()
  readonly totalAmount: number;
  @IsNumber()
  readonly totalItems: number;
  @IsNumber()
  readonly restaurantId: number;
  @IsNumber()
  readonly userId: number;
  @IsString()
  @IsOptional()
  readonly status: Status = Status.PLACED;
  @IsString()
  @IsOptional()
  readonly paymentStatus: PaymentStatus = PaymentStatus.NOT_PAID;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  readonly items: OrderItemDto[];
 
  @IsString()
  @IsOptional()
  readonly createdAt?: string;
  @IsString()
  @IsOptional()
  readonly updatedAt?: string;

}
