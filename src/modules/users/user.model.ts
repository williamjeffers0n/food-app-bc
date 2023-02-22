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
@Table({ modelName: 'users', timestamps: true, paranoid: true })
export class User extends Model {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column
  id: number;

  @Column({ field: 'uid' })
  uid: string;

  @Column({ field: 'full_name' })
  fullName: string;

  @Column({ field: 'address' })
  address: string;

  @Column({ field: 'username' })
  username: string;

  @Column({ field: 'phone_ext' })
  phoneExt: string;

  @Column({ field: 'phone' })
  phone: string;

  @Column({ field: 'email' })
  email: string;

  @Column({ field: 'password_hash' })
  passwordHash: string;

  @Column({ field: 'password_salt' })
  passwordSalt: string;

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
