import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
}