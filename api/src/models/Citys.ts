import {
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { usercitys } from "./usercitys";
import { users } from "./users";

interface City{
  id?:number,
  name:string,
  createdAt?:Date,
  updatedAt?:Date
}

@Table
export class citys extends Model<City> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!:number

  @Column(DataType.CHAR)
  name!:string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsToMany(() => users, () => usercitys)
  users!: Array<users & { usercitys: usercitys }>;
}
