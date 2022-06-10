import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Citys } from "./Citys";
import { Users } from "./Users";

interface UserCity{
  userId:number,
  cityId:number
}

@Table
export class Usercitys extends Model<UserCity> {
  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId!: number;

  @ForeignKey(() => Citys)
  @Column(DataType.INTEGER)
  cityId!: number;
}
