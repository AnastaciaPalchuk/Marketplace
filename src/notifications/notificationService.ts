import { inject, injectable } from "inversify";
import {
  NotificationRepositoryToken,
  INotificationRepository,
} from "./interfaces/INotificationRepository";
import { Mail } from "../mail/mailService";

@injectable()
export class NotificationService {
  constructor(
    @inject(NotificationRepositoryToken)
    private readonly repository: INotificationRepository,
    private readonly mail: Mail
  ) {}

  async addEmailVerificationCode(code: number, user_id: number) {
    return this.repository.addEmailVerificationCode(code, user_id);
  }

  async addPasswordResetCode(code: number, id: number) {
    return this.repository.addPasswordResetCode(code, id);
  }

  async getCode(user_id: number) {
    return this.repository.getCode(user_id);
  }

  async findUserId(code: number) {
    return this.repository.findUserId(code);
  }

  async sendCode(id: number, email: string, code: number) {
    return this.mail.sendMail(id, email, code);
  }
}
