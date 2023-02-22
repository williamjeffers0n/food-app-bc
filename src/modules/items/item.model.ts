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
import { RestaurantItem } from '../restaurants/restaurant-item.model';
import { Restaurant } from '../restaurants/restaurant.model';
@Table({ modelName: 'items', timestamps: true, paranoid: true })
export class Item extends Model {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column
  id: number;

  @Column({ field: 'name' })
  name: string;

  @Column({ field: 'description' })
  description: string;

  @Column({ field: 'photo_url' })
  photoUrl: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: string;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: string;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt?: string;

  @BelongsToMany(() => Restaurant, () => RestaurantItem)
  restaurants: Restaurant[];

}
