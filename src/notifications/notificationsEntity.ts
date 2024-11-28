import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "../auth/userEntity";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  code!: number;

  @Column({ type: "enum", enum: ["PASSWORD_RESET", "EMAIL_VERIFICATION"] })
  type_of_notice!: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
