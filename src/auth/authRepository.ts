import { injectable } from "inversify";
import { Database } from "../infra/database";
import { AccessType } from "./types";
import { IAuthRepository } from "./interfaces/IAuthRepository";

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly database: Database) {}

  async findUserByEmail(userEmail: string) {
    const result = await this.database.query(
      `
              SELECT *
              from users
              where email = $1
          `,
      [userEmail]
    );
    return result.rows[0];
  }
  async findUserById(id: number) {
    const result = await this.database.query(
      `
              SELECT *
              from users
              where id = $1
          `,
      [id]
    );
    return result.rows[0];
  }

  async createNewUser(
    userName: string,
    userSurname: string,
    userEmail: string,
    userPassword: string,
    code: number
  ) {
    const user = await this.database.query(
      `
              insert into users (name, surname, email, password, access_type)
              VALUES ($1, $2, $3, $4, '${AccessType.USER}')
              returning *;
              `,
      [userName, userSurname, userEmail, userPassword]
    );
    const expires_at = new Date(Date.now() + 15 * 60 * 1000);
    await this.database.query(
      `
                insert into notifications (user_id, code, type_of_notice, expires_at)
                VALUES ($1, $2, 'EMAIL_VERIFICATION', $3);
                `,
      [user.rows[0].id, code, expires_at]
    );

    return user.rows[0];
  }

  async addEmailCode(code: number, user_id: number){
    const expires_at = new Date(Date.now() + 15 * 60 * 1000);
    return this.database.query(
      `
                insert into notifications (user_id, code, type_of_notice, expires_at)
                VALUES ($1, $2, 'EMAIL_VERIFICATION', $3);
                `,
      [user_id, code, expires_at]
    );
  }
  async isVerified(user_id: number) {
    const isVerified = await this.database.query(
      `
      SELECT *
      from users
      where id = $1;
      `,
      [user_id]
    );
    return isVerified.rows[0].is_email_verified;
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

  async changeEmailIsVerified(user_id: number) {
    return this.database.query(
      `
      UPDATE users
        SET is_email_verified = true
        WHERE id = $1;
        `,
      [user_id]
    );
  }

  async addCode(code: number, id: number) {
    return this.database.query(
      `
      insert into notifications (user_id, code, type_of_notice)
      VALUES ($1, $2, 'PASSWORD_RESET');
      `,
      [id, code]
    );
  }

  async changePassword(id: number, password: string) {
    return this.database.query(
      `
      UPDATE users
      SET password = $2
      WHERE id = $1
      `,
      [id, password]
    );
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
