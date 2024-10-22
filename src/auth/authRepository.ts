import { injectable } from "inversify";
import { Database } from "../infra/database";
import { AccessType } from "./types";
import { IAuthRepository } from "./interfaces/IAuthRepository";


@injectable()
export class AuthRepository implements IAuthRepository {
    constructor(private readonly database: Database) {
    }
  
    async findUserByEmail(userEmail: string) {
      const result = await this.database.query(`
              SELECT *
              from users
              where email = $1
          `, [userEmail]);
          return result.rows[0];
    }
  
    async createNewUser(userName: string, userSurname: string, userEmail: string, userPassword: string) {
      return this.database.query(`
              insert into users (name, surname, email, password, access_type)
              VALUES ($1, $2, $3, $4, '${AccessType.USER}')
              returning *;
              `, [userName, userSurname, userEmail, userPassword]);
    }
  
  }
    