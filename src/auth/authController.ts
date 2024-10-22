import { Context } from "koa";
import { AuthService } from "./authService";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";
import { WrongCredentials } from "./errors/WrongCredentials";
import { injectable } from "inversify";

@injectable()
export class AuthController {
  constructor(
    private readonly service: AuthService) {}

  create = async (ctx: Context) => {
    const user = ctx.request.body as {
      name: string;
      surname: string;
      email: string;
      password: string;
    };
    console.log(user)

    try {
      const userInfo = await this.service.createUser(
        user.name,
        user.surname,
        user.email,
        user.password
      );
      ctx.body = {
        user: {
          id: userInfo.rows[0].id,
          name: userInfo.rows[0].name,
          surname: userInfo.rows[0].surname,
          email: userInfo.rows[0].email,
        },
      };
    } catch (err) {
      if (err instanceof UserAlreadyExists) {
        ctx.status = 403;
        ctx.body = err.message;
        return;
      }
    }
  };

  login = async (ctx: Context) => {
    const user = ctx.request.body as { email: string; password: string };
    try {
      const userSignIn = await this.service.loginUser(
        user.email,
        user.password
      );
      ctx.body = userSignIn;
    } catch (err) {
      if (err instanceof WrongCredentials) {
        ctx.status = 400;
        ctx.body = err.message;
        return;
      }
    }
  };
}
