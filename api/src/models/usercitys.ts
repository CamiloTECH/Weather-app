import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { citys } from "./citys";
import { users } from "./users";

@Table
export class usercitys extends Model<usercitys> {
  @ForeignKey(() => users)
  @Column
  userId!: number;

  @ForeignKey(() => citys)
  @Column
  cityId!: number;
}
