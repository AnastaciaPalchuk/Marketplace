import { inject, injectable } from "inversify";
import {
  NotificationRepositoryToken,
  INotificationRepository,
} from "./interfaces/INotificationRepository";
import { Mail } from "../mail/mailService";
import { randomInt } from "crypto";

@injectable()
export class NotificationService {
  constructor(
    @inject(NotificationRepositoryToken)
    private readonly repository: INotificationRepository,
    private readonly mail: Mail
  ) {}

  generateCode(){
    return randomInt(100000, 999999);
  }

  async addCode(user_id: number, type: string) {
    const code = this.generateCode();
    await this.repository.addCode(code, user_id, type);
    return code;
  }

  async getCode(user_id: number, type_of_notice: string) {
    return this.repository.getCode(user_id, type_of_notice);
  }

  async checkCode(id: number, code: number) {
    return this.repository.checkCode(id, code);
  }

}
