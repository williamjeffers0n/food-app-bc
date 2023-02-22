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
import { OrderItem } from './order-item.model';
@Table({ modelName: 'orders', timestamps: true, paranoid: true })
export class Order extends Model {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column
  id: number;

  @Column({ field: 'total_amount' })
  totalAmount: number;
  
  @Column({ field: 'total_items' })
  totalItems: number;

  @Default(Status.PLACED)
  @Column(DataType.ENUM({ values: Object.keys(Status) }))
  status: Status;

  @Default(PaymentStatus.NOT_PAID)
  @Column(DataType.ENUM({ values: Object.keys(PaymentStatus)}))
  payment_status: PaymentStatus;

  @Column({ field: 'restaurant_id' })
  restaurantId: number;

  @Column({ field: 'user_id' })
  userId: number;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: string;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: string;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt?: string;

  @HasMany( () => OrderItem)
  orderItems: OrderItem[];

  @BelongsToMany(() => Item, () => OrderItem)
  items: Item[];

}