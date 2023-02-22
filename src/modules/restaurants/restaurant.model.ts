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
import { Status } from '../../database/enums/status.enum';
import { Item } from '../items/item.model';
import { RestaurantItem } from './restaurant-item.model';
@Table({ modelName: 'restaurants', timestamps: true, paranoid: true })
export class Restaurant extends Model {
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

  @Column({ field: 'address' })
  address: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: string;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: string;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt?: string;

  @BelongsToMany(() => Item, () => RestaurantItem)
  items: Item[];

}
