import { createHash, randomInt } from "node:crypto";
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
import config from "../config/index";

@injectable()
export class AuthService {
  constructor(
    @inject(AuthRepositoryToken)
    private readonly repository: IAuthRepository,
    private readonly mail: Mail
  ) {}

  generateCode(){
    return randomInt(100000, 999999);
  }

  hash(password: string){
  return createHash("sha256").update(password).digest("hex")
  }

  async createUser(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    const code = this.generateCode();
    const findUser = await this.repository.findUserByEmail(email);
    let hashpassword = this.hash(password);
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
      await this.mail.sendMail(user.id, email, code);
      return user;
    }
  }

  async loginUser(email: string, password: string) {
    let hashpassword = this.hash(password);
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
            config.jwt.token
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

    if(checkCode.code !== code){throw new WrongCode()}
    else if ( checkCode.expires_at < Date.now()){
      const newCode = this.generateCode();
      const user = await this.repository.findUserById(user_id)
      await this.repository.addEmailCode(newCode, user_id);
      await this.mail.sendMail(user_id, user.email, code);
      return "expired";
    }
      return this.repository.changeEmailIsVerified(user_id);
  }

  async passwordReset(email: string){
    const code = this.generateCode();
    const findUser = await this.repository.findUserByEmail(email);
    if (findUser) {
      await Promise.all([
        this.mail.passwordReset(email, code),
        this.repository.addCode(code, findUser.id)
      ])
      return findUser;
    } else {
      throw new WrongCredentials();
  }
}

async changePassword(code: number, password: string){
  let checkCode = await this.repository.findUserId(code);
  let hashpassword = this.hash(password);
  if(checkCode){
    return this.repository.changePassword(checkCode, hashpassword);
  }
  else{
    throw new WrongCode();
  }
}
}
