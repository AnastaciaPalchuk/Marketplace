import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import {User}  from "../auth/userEntity"
import { Item } from "../item/itemEntity"

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    user_id!: number

    @Column()
    item_id!: number

    @Column()
    count!: number

    @Column()
    price!: number

    @ManyToOne(() => Item, (item) => item.id)
    @JoinColumn({ name: "item_id" })
    item!: Item

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user!: User
}
