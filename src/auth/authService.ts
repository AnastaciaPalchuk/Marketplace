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
import { NotificationService } from "../notifications/notificationService";
import { ExpiredCode } from "./errors/ExpiredCode";

@injectable()
export class AuthService {
  constructor(
    @inject(AuthRepositoryToken)
    private readonly repository: IAuthRepository,
    private readonly mail: Mail,
    private readonly notificationservice: NotificationService
  ) {}

  hash(password: string) {
    return createHash("sha256").update(password).digest("hex");
  }

  async createUser(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    const findUser = await this.repository.findUserByEmail(email);
    let hashpassword = this.hash(password);
    if (findUser) {
      throw new UserAlreadyExists();
    } else {
      const user = await this.repository.createNewUser(
        name,
        surname,
        email,
        hashpassword
      );

      // TODO create variabel code that notifiaction service will return and use it to sendMAil
      await this.notificationservice.addCode(user.id, "EMAIL_VERIFICATION");
      const thisCode = await this.notificationservice.getCode(user.id);
      await this.mail.sendMail(user.id, user.email, thisCode.code);
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

  async verifyEmail(code: number, user_id: number) {
    let checkCode = await this.notificationservice.getCode(user_id);
    const expires_at = checkCode.created_at + 15 * 60 * 1000;

    if (checkCode.code !== code) {
      throw new WrongCode();
    } else if (expires_at < Date.now()) {
      //TODO remove
      const user = await this.repository.findUserById(user_id);
      await this.notificationservice.addCode(user_id, "EMAIL_VERIFICATION");
      await this.mail.sendMail(user_id, user.email, code);
      throw new ExpiredCode();
    }
    return this.repository.changeEmailIsVerified(user_id);
  }

  async passwordReset(email: string) {
    //TODO remove
    const findUser = await this.repository.findUserByEmail(email);
    if (findUser) {
      const thisCode = await this.notificationservice.getCode(findUser.id);
      await Promise.all([
        this.mail.passwordReset(email, thisCode.id),
        this.notificationservice.addCode(findUser.id, "PASSWORD_RESET"),
      ]);
      return findUser;
    } else {
      throw new WrongCredentials();
    }
  }

  async changePassword(id: number, code: number, password: string) {
    // TODO accept id of notification and then check code
    let checkCode = await this.notificationservice.checkCode(id, code);
    let hashpassword = this.hash(password);
    const expires_at = checkCode.created_at + 15 * 60 * 1000;
    if (checkCode) {
      if (expires_at < Date.now()) {
        return this.repository.changePassword(checkCode.user_id, hashpassword);
      } else {
        throw new ExpiredCode();
      }
    } else {
      throw new WrongCode();
    }
  }
}
