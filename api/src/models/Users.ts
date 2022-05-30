import {
  BelongsToMany,
  Column,
  CreatedAt,
  Model,
  Table,
  Unique,
  UpdatedAt,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { citys } from "./citys";
import { usercitys } from "./usercitys";

interface User{
  id?:number,
  userName:string,
  email:string,
  password:string
  creationDate?:Date,
  updatedOn?:Date
}

@Table
export class users extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!:number

  @Unique(false)
  @Column(DataType.STRING)
  userName!: string;

  @Unique(true)
  @Column(DataType.STRING)
  email!: string;

  @Unique(false)
  @Column(DataType.TEXT)
  password!: string;

  @CreatedAt
  @Column(DataType.DATE)
  creationDate!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedOn!: Date;

  @BelongsToMany(() => citys, () => usercitys)
  citys!: Array<citys & { usercitys: usercitys }>;
}
