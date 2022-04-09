import { Column, CreatedAt, Model, Table, Unique, UpdatedAt } from "sequelize-typescript";

@Table
export class Users extends Model<Users> {
  @Unique
  @Column
  name!: string;

  @CreatedAt
  @Column
  createdAt!: string;

  @UpdatedAt
  @Column
  updatedAt!: string;
}
