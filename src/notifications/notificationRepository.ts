import { injectable } from "inversify";
import { Database } from "../infra/database";
import { INotificationRepository } from "./interfaces/INotificationRepository";

@injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(private readonly database: Database) {}

  async addEmailVerificationCode(code: number, user_id: number) {
    await this.database.query(
      `
                  insert into notifications (user_id, code, type_of_notice)
                  VALUES ($1, $2, 'EMAIL_VERIFICATION');
                  `,
      [user_id, code]
    );
  }

  async addPasswordResetCode(code: number, id: number) {
    return this.database.query(
      `
      insert into notifications (user_id, code, type_of_notice)
      VALUES ($1, $2, 'PASSWORD_RESET');
      `,
      [id, code]
    );
  }

  async getCode(user_id: number) {
    const getCode = await this.database.query(
      `
     SELECT *
      from notifications
      where user_id = $1;
      `,
      [user_id]
    );
    return getCode.rows[0];
  }

  async findUserId(code: number) {
    const user = await this.database.query(
      `
      SELECT *
      from notifications
      WHERE code = $1
      `,
      [code]
    );
    return user.rows[0].user_id;
  }
}
