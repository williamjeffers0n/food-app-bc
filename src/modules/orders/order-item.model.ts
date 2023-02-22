import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { PaymentStatus } from 'src/database/enums/payment-status.enum';
import { Status } from '../../database/enums/status.enum';
import { Item } from '../items/item.model';
import { Order } from './order.model';
@Table({ modelName: 'order_items', timestamps: true, paranoid: true })
export class OrderItem extends Model {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column
  id: number;

  @Column({ field: 'price_per_item' })
  pricePerItem: number;
  
  @Column({ field: 'total_item_amount' })
  totalItemAmount: number;

  @Column({ field: 'no_of_item' })
  noOfItem: number;

  @ForeignKey(() => Item)
  @Column({ field: 'item_id' })
  itemId: number;
  @BelongsTo(() => Item)
  item: Item;

  @ForeignKey(() => Order)
  @Column({ field: 'order_id' })
  orderId: number;
  @BelongsTo(() => Order)
  order: Order;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: string;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: string;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt?: string;

}