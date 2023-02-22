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
import { Quantity } from 'src/database/enums/quantity.enum';
import { Item } from '../items/item.model';
import { Restaurant } from './restaurant.model';
@Table({ modelName: 'restaurant_items', timestamps: true, paranoid: true })
export class RestaurantItem extends Model {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Restaurant)
  @Column({ field: 'restaurant_id' })
  restaurantId: number;
  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @ForeignKey(() => Item)
  @Column({ field: 'item_id' })
  itemId: number;
  @BelongsTo(() => Item)
  item: Item;

  @Column({ field: 'amount' })
  amount: number;

  @Default(Quantity.SMALL)
  @Column(DataType.ENUM({ values: Object.keys(Quantity) }))
  quantity: Quantity; 

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
