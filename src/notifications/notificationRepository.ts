import { injectable } from "inversify";
import { Database } from "../infra/database";
import { INotificationRepository } from "./interfaces/INotificationRepository";

@injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(private readonly database: Database) {}

  async addCode(code: number, user_id: number, type: string) {
    return this.database.query(
      `
                  insert into notifications (user_id, code, type_of_notice)
                  VALUES ($1, $2, $3);
                  `,
      [user_id, code, type]
    );
  }

  async getCode(user_id: number, type_of_notice: string) {
    const getCode = await this.database.query(
      `
     SELECT *
      from notifications
      where user_id = $1 and type_of_notice = $2;
      `,
      [user_id, type_of_notice]
    );
    return getCode.rows[0];
  }

  async checkCode(id: number, code: number) {
    const user = await this.database.query(
      `
      SELECT *
      from notifications
      WHERE id = $1 and code = $2
      `,
      [id, code]
    );
    return user.rows[0];
  }
}
