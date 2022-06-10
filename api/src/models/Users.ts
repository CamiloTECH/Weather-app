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
import { Citys } from "./Citys";
import { UserCitys } from "./UserCitys";

interface User{
  id?:number,
  userName:string,
  email:string,
  password:string
  token?:string
  creationDate?:Date,
  updatedOn?:Date
}

@Table
export class Users extends Model<User> {
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

  @Column(DataType.STRING)
  token!:string

  @CreatedAt
  @Column(DataType.DATE)
  creationDate!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedOn!: Date;

  @BelongsToMany(() => Citys, () => UserCitys)
  citys!: Array<Citys & { UserCitys: UserCitys }>;
}
