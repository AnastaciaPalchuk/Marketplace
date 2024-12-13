
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "../auth/UserModel";

@Table({tableName: "notification", timestamps: false})
export class NotificationModel extends Model{
  @AutoIncrement
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id!: number

  @ForeignKey(() => UserModel)
  @Column({type: DataType.INTEGER})
  user_id!: number;

  @Column({type: DataType.INTEGER})
  code!: number;

  @Column({ type: DataType.ENUM("PASSWORD_RESET", "EMAIL_VERIFICATION")})
  type_of_notice!: string;

  @Column({type: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'})
  created_at!: Date;

  @BelongsTo(() => UserModel)
  user!: UserModel
}
