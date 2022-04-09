import {
  BelongsToMany,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { usercitys } from "./usercitys";
import { users } from "./users";

@Table
export class citys extends Model<citys> {
  @Column
  name!: string;

  @Column
  cityId!: number;

  @CreatedAt
  @Column
  createdAt!: string;

  @UpdatedAt
  @Column
  updatedAt!: string;

  @BelongsToMany(() => users, () => usercitys)
  users!: Array<users & { usercitys: usercitys }>;
}
