import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { Category } from "./categoryEntity"

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    category_id!: number

    @Column()
    name!: string

    @Column()
    count!: number

    @Column()
    price!: number

    @CreateDateColumn()
    created_at!: Date

    @Column()
    photo!: string


    @ManyToOne(() => Category, (category) => category.id)
    @JoinColumn({ name: "category_id" })
    category!: Category
}