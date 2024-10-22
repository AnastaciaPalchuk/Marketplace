import { createHash } from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";
import { WrongCredentials } from "./errors/WrongCredentials";
import { inject, injectable } from "inversify";
import { AuthRepositoryToken, IAuthRepository } from "./interfaces/IAuthRepository";

@injectable()
export class AuthService {
  constructor(
    @inject(AuthRepositoryToken) 
    private readonly repository: IAuthRepository
  ) {}

  async createUser(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    const findUser = await this.repository.findUserByEmail(email);
    let hashpassword = createHash("sha256").update(password).digest("hex");
    if (findUser) {
      throw new UserAlreadyExists();
    } else {
      const user = await this.repository.createNewUser(
        name,
        surname,
        email,
        hashpassword
      );
      return user;
    }
  }

  async loginUser(email: string, password: string) {
    let hashpassword = createHash("sha256").update(password).digest("hex");
    let userLogin = await this.repository.findUserByEmail(email);
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
  }
}
