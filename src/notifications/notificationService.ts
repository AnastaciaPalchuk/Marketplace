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
    return this.repository.addCode(this.generateCode(), user_id, type);
  }

  async getCode(user_id: number) {
    return this.repository.getCode(user_id);
  }

  async checkCode(id: number, code: number) {
    return this.repository.checkCode(id, code);
  }

}
