import { injectable } from "inversify";
import { User } from "./userEntity";
import { IAuthRepository } from "./interfaces/IAuthRepository";
import { Database } from "../infra/dataSource";

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly dataSource: Database) {}

  async findUserByEmail(userEmail: string) {
    const repo = this.dataSource.getRepository(User);
    const user = await repo.findOne({ where: { email: userEmail } });
    return user;
  }
  async findUserById(id: number) {
    const repo = this.dataSource.getRepository(User);
    const user = await repo.findOne({ where: { id: id } });
    return user;
  }

  async createNewUser(
    userName: string,
    userSurname: string,
    userEmail: string,
    userPassword: string
  ) {
    const repo = this.dataSource.getRepository(User);
    const user = await repo.insert({
      name: userName,
      surname: userSurname,
      email: userEmail,
      password: userPassword,
      access_type: "USER",
    });
    return user;
  }

  async changeEmailIsVerified(user_id: number) {
    const repo = this.dataSource.getRepository(User);
    await repo.update({ id: user_id }, { is_email_verified: true });
  }

  async changePassword(id: number, password: string) {
    const repo = this.dataSource.getRepository(User);
    await repo.update({ id: id }, { password: password });
  }
}
