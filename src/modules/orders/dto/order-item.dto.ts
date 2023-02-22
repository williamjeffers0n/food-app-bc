import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentStatus } from 'src/database/enums/payment-status.enum';
import { Status } from 'src/database/enums/status.enum';

export class OrderItemDto {
  @IsNumber()
  readonly pricePerItem: number;

  @IsNumber()
  readonly totalItemAmount: number;

  @IsNumber()
  readonly noOfItem: number;

  @IsNumber()
  readonly itemId: number;

  @IsNumber()
  readonly orderId: number;
 
  @IsString()
  @IsOptional()
  readonly createdAt?: string;
  @IsString()
  @IsOptional()
  readonly updatedAt?: string;

}
