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
import { NotificationService } from "../notifications/notificationService";
import { ExpiredCode } from "./errors/ExpiredCode";
import { CryptoService } from "../crypto/cryptoService";
import bcrypt from 'bcrypt';

@injectable()
export class AuthService {
  constructor(
    @inject(AuthRepositoryToken)
    private readonly repository: IAuthRepository,
    private readonly mail: Mail,
    private readonly notificationservice: NotificationService,
    private readonly crypto: CryptoService
  ) {}

  async createUser(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    const findUser = await this.repository.findUserByEmail(email);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (findUser) {
      throw new UserAlreadyExists();
    } else {
      const user = await this.repository.createNewUser(
        name,
        surname,
        email,
        hashedPassword
      );
      const code = await this.notificationservice.addCode(user.id, "EMAIL_VERIFICATION");
      await this.mail.sendMail(user.id, email, code);
      return user;
    }
  }

  async loginUser(email: string, password: string) {
    let userLogin = await this.repository.findUserByEmail(email);
    const isVerified = await this.repository.findUserById(userLogin!.id);
    if (isVerified!.is_email_verified) {
      const match = await bcrypt.compare(password, userLogin!.password);
      console.log(match)
      if (match) {
        return this.crypto.jwtSign(userLogin!.id, userLogin!.access_type, config.jwt.token);
      } else {
        throw new WrongCredentials();
      }
    } else {
      throw new EmailNotVerifies();
    }
  }

  async verifyEmail(code: number, user_id: number) {
    let checkCode = await this.notificationservice.getCode(user_id, "EMAIL_VERIFICATION");
    const expires_at = checkCode.created_at + 15 * 60 * 1000;

    if (checkCode.code !== code) {
      throw new WrongCode();
    } else if (expires_at < Date.now()) {
      const user = await this.repository.findUserById(user_id);
      await this.notificationservice.addCode(user_id, "EMAIL_VERIFICATION");
      await this.mail.sendMail(user_id, user!.email, code);
      throw new ExpiredCode();
    }
    return this.repository.changeEmailIsVerified(user_id);
  }

  async passwordReset(email: string) {
    const findUser = await this.repository.findUserByEmail(email);
    if (findUser) {
      const thisCode = await this.notificationservice.getCode(findUser.id, "PASSWORD_RESET");
      if(thisCode){
          await this.notificationservice.deleteCode(thisCode.dataValues.code);
        }
      const newCode = await this.notificationservice.addCode(findUser.id, "PASSWORD_RESET");
      await this.mail.passwordReset(email, newCode); 
      return findUser;
    } else {
      throw new WrongCredentials();
    }
  }

  async changePassword(id: number, code: number, password: string) {
    let checkCode = await this.notificationservice.checkCode(id, code);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createdAt = new Date(checkCode.created_at);
    const expires_at = createdAt.getTime() + 15 * 60 * 1000;
    if (checkCode) {
      if (expires_at > Date.now()) {
        return this.repository.changePassword(checkCode.user_id, hashedPassword);
      } else {
        throw new ExpiredCode();
      }
    } else {
      throw new WrongCode();
    }
  }
}
