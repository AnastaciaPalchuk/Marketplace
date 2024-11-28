import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    surname!: string

    @Column()
    email!: string

    @Column({ length: 255 })
    password!: string

    @Column({ type: "enum", enum: ["ADMIN", "USER"], default: "USER" })
    access_type!: string

    @Column({ default: false })
    is_email_verified!: boolean
}