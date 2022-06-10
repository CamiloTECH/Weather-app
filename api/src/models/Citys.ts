import {
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import { UserCitys } from "./UserCitys";
import { Users } from "./Users";

interface City{
  id?:number,
  name:string,
  createdAt?:Date,
  updatedAt?:Date
}

@Table
export class Citys extends Model<City> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!:number

  @Unique(true)
  @Column(DataType.CHAR)
  name!:string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsToMany(() => Users, () => UserCitys)
  users!: Array<Users & { usercitys: UserCitys }>;
}
