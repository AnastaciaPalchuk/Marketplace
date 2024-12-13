import { AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { CategoryModel } from "./CategoryModel"
import { UserModel } from "../auth/UserModel"
import { CartModel } from "../cart/CartModel"

@Table({tableName: "item", timestamps: false})
export class ItemModel extends Model{
    @AutoIncrement
    @Column({ type: DataType.INTEGER, primaryKey: true })
    id!: number

    @ForeignKey(() => CategoryModel)
    @Column({type: DataType.INTEGER})
    category_id!: number

    @Column({type: DataType.STRING})
    name!: string

    @Column({type: DataType.INTEGER})
    count!: number

    @Column({type: DataType.INTEGER})
    price!: number

    @Column({type: DataType.DATE})
    created_at!: Date

    @Column({type: DataType.STRING})
    photo!: string

    @BelongsToMany(() => UserModel, () => CartModel)
    users!: UserModel[]

    @BelongsTo(() => CategoryModel)
    category!: CategoryModel

}