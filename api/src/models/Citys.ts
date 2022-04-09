import { Column, CreatedAt, Model, Table, UpdatedAt } from "sequelize-typescript"
@Table

export class Citys extends Model<Citys>{
  @Column
  name!:string
  
  @Column
  cityId!:number

  @CreatedAt
  @Column
  createdAt!:string

  @UpdatedAt
  @Column
  updatedAt!:string
}