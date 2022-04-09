import {
  BelongsToMany,
  Column,
  CreatedAt,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import { citys } from "./citys";
import { usercitys } from "./usercitys";

@Table
export class users extends Model<users> {
  @Unique
  @Column
  name!: string;

  @CreatedAt
  @Column
  createdAt!: string;

  @UpdatedAt
  @Column
  updatedAt!: string;

  @BelongsToMany(() => citys, () => usercitys)
  citys!: Array<citys & { usercitys: usercitys }>;
}
