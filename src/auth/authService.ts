import { createHash, randomInt } from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";
import { WrongCredentials } from "./errors/WrongCredentials";
import { inject, injectable } from "inversify";
import {
  AuthRepositoryToken,
  IAuthRepository,
} from "./interfaces/IAuthRepository";
import { EmailNotVerifies } from "./errors/EmailNotVerified";
import { WrongCode } from "./errors/WrongCode";
import { Mail } from "../mail/mailService";

@injectable()
export class AuthService {
  constructor(
    @inject(AuthRepositoryToken)
    private readonly repository: IAuthRepository,
    private readonly mail: Mail
  ) {}

  async createUser(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    const code = randomInt(100000, 999999);
    const findUser = await this.repository.findUserByEmail(email);
    let hashpassword = createHash("sha256").update(password).digest("hex");
    if (findUser) {
      throw new UserAlreadyExists();
    } else {
      const user = await this.repository.createNewUser(
        name,
        surname,
        email,
        hashpassword,
        code
      );
      await this.mail.sendMail(user.rows[0].id, email, code);
      return user;
    }
  }

  async loginUser(email: string, password: string) {
    let hashpassword = createHash("sha256").update(password).digest("hex");
    let userLogin = await this.repository.findUserByEmail(email);
    const isVerified = await this.repository.isVerified(userLogin.id);
    if (isVerified) {
      if (userLogin.password === hashpassword) {
        return {
          token: jsonwebtoken.sign(
            {
              id: userLogin.id,
              access_type: userLogin.access_type,
            },
            "secret"
          ),
        };
      } else {
        throw new WrongCredentials();
      }
    } else {
      throw new EmailNotVerifies();
    }
  }

  async verifyEmail(code: number, user_id: number){
    let checkCode = await this.repository.getCode(user_id);
    if(checkCode === code){
      return this.repository.changeEmailIsVerified(user_id);
    }
    else{
      throw new WrongCode();
    }
  }

  async passwordReset(email: string){
    const code = randomInt(100000, 999999);
    const findUser = await this.repository.findUserByEmail(email);
    if (findUser) {
      await this.mail.passwordReset(email, code);
      await this.repository.addCode(code, findUser.id);
      return findUser;
    } else {
      throw new WrongCredentials();
  }
}

async changePassword(code: number, password: string){
  let checkCode = await this.repository.findUserId(code);
  let hashpassword = createHash("sha256").update(password).digest("hex");
  if(checkCode){
    return this.repository.changePassword(checkCode, hashpassword);
  }
  else{
    throw new WrongCode();
  }
}
}
