import { AutoIncrement, Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { ItemModel } from "./ItemModel"

@Table({tableName: "category", timestamps: false})
export class CategoryModel extends Model{
    @AutoIncrement
    @Column({ type: DataType.INTEGER, primaryKey: true })
    id!: number

    @Column({type: DataType.STRING})
    name!: string

    @HasMany(() => ItemModel)
    item!: ItemModel[]
}