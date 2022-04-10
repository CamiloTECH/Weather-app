import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { citys } from "./citys";
import { users } from "./users";

interface UserCity{
  userId:number,
  cityId:number
}

@Table
export class usercitys extends Model<UserCity> {
  @ForeignKey(() => users)
  @Column(DataType.INTEGER)
  userId!: number;

  @ForeignKey(() => citys)
  @Column(DataType.INTEGER)
  cityId!: number;
}
