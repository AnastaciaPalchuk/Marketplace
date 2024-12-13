import { injectable } from "inversify";
import { Database } from "../infra/database";
import { INotificationRepository } from "./interfaces/INotificationRepository";
import { NotificationModel } from "./NotificationModel";

@injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(private readonly dataSource: Database) {}

  async addCode(code: number, user_id: number, type: string) {
    return NotificationModel.create({
      user_id: user_id,
      code: code,
      type_of_notice: type
    })
  }

  async getCode(user_id: number, type_of_notice: string) {
    const getCode = await NotificationModel.findOne({where: {user_id: user_id, type_of_notice: type_of_notice}})
    return getCode;
  }

  async checkCode(id: number, code: number) {
    const user = await NotificationModel.findOne({where: {user_id: id, code: code}})
    return user!.dataValues;
  }

  async deleteCode(code: number){
    await NotificationModel.destroy({where: {code: code}})
}
}
