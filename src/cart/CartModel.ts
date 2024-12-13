import {UserModel}  from "../auth/UserModel"
import { ItemModel } from "../item/ItemModel"
import { AutoIncrement, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"

@Table({tableName: "cart", timestamps: false})
export class CartModel extends Model{
    @AutoIncrement
    @Column({type: DataType.INTEGER, primaryKey: true})
    id!: number

    @Column({type: DataType.INTEGER})
    count!: number

    @Column({type: DataType.INTEGER})
    price!: number

    @ForeignKey(() => ItemModel)
    @Column({type: DataType.INTEGER})
    item_id!: number

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER})
    user_id!: number
}
