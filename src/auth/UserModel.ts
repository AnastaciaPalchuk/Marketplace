import { AutoIncrement, BelongsToMany, Column, DataType, Model, NotNull, Table } from "sequelize-typescript"
import { CartModel } from "../cart/CartModel"
import { ItemModel } from "../item/ItemModel"

@Table({ tableName: "user", timestamps: false })
export class UserModel extends Model{
    @AutoIncrement
    @Column({ type: DataType.INTEGER, primaryKey: true })
    id!: number

    @Column({type: DataType.STRING})
    name!: string

    @Column({type: DataType.STRING})
    surname!: string

    @Column({type: DataType.STRING})
    email!: string

    @Column({ type: DataType.STRING(255) })
    password!: string

    @Column({ type: DataType.ENUM("ADMIN", "USER"), defaultValue: "USER" })
    access_type!: string

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    is_email_verified!: boolean

    @BelongsToMany(() => ItemModel, () => CartModel)
    items!: ItemModel[]
}