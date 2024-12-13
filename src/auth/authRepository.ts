import { injectable } from "inversify";
import { UserModel } from "./UserModel";
import { IAuthRepository } from "./interfaces/IAuthRepository";
import { Database } from "../infra/database";

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly dataSource: Database) {}

  async findUserByEmail(userEmail: string) {
    const user = await UserModel.findOne({ where: { email: userEmail } });
    return user;
  }
  async findUserById(id: number) {
    const user = await UserModel.findOne({ where: { id: id } });
    return user!.dataValues;
  }

  async createNewUser(
    userName: string,
    userSurname: string,
    userEmail: string,
    userPassword: string
  ) {
    const user = await UserModel.create({
      name: userName,
      surname: userSurname,
      email: userEmail,
      password: userPassword,
      access_type: "USER",
    });
    return user;
  }

  async changeEmailIsVerified(user_id: number) {
    await UserModel.update({is_email_verified: true }, { where: { id: user_id }});
  }

  async changePassword(id: number, password: string) {
    await UserModel.update({password: password }, { where: { id: id }});
  }
}
