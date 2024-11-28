import { injectable } from "inversify";
import { Database } from "../infra/dataSource";
import { INotificationRepository } from "./interfaces/INotificationRepository";
import { Notification } from "./notificationsEntity";

@injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(private readonly dataSource: Database) {}

  async addCode(code: number, user_id: number, type: string) {
    const repo = this.dataSource.getRepository(Notification);
    return repo.insert({
      user_id: user_id,
      code: code,
      type_of_notice: type
    })
  }

  async getCode(user_id: number, type_of_notice: string) {
    const repo = this.dataSource.getRepository(Notification);
    const getCode = await repo.findOne({where: {user_id: user_id, type_of_notice: type_of_notice}})
    return getCode;
  }

  async checkCode(id: number, code: number) {
    const repo = this.dataSource.getRepository(Notification);
    const user = await repo.findOne({where: {user_id: id, code: code}})
    return user;
  }

  async deleteCode(code: number){
    const repo = this.dataSource.getRepository(Notification);
    return repo.delete({code: code})
}
}
