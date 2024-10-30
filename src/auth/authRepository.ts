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
  ) {
    const user = await this.database.query(
      `
              insert into users (name, surname, email, password, access_type)
              VALUES ($1, $2, $3, $4, '${AccessType.USER}')
              returning *;
              `,
      [userName, userSurname, userEmail, userPassword]
    );

    return user.rows[0];
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
}
