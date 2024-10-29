import { Context } from "koa";
import { AuthService } from "./authService";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";
import { WrongCredentials } from "./errors/WrongCredentials";
import { injectable } from "inversify";
import { EmailNotVerifies } from "./errors/EmailNotVerified";
import { WrongCode } from "./errors/WrongCode";

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
    try {
      const userInfo = await this.service.createUser(
        user.name,
        user.surname,
        user.email,
        user.password
      );
      ctx.body = {
        user: {
          id: userInfo.id,
          name: userInfo.name,
          surname: userInfo.surname,
          email: userInfo.email,
        },
      };
    } catch (err: any) {
      if (err instanceof UserAlreadyExists) {
        ctx.status = 403;
        ctx.body = err.message;
        return;
      }
      ctx.status = 500;
      ctx.body = err.message;
      return;
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
    } catch (err: any) {
      if (err instanceof WrongCredentials) {
        ctx.status = 400;
        ctx.body = err.message;
        return;
      }
      else if( err instanceof EmailNotVerifies){
        ctx.status = 400;
        ctx.body = err.message;
        return;
      }
      ctx.status = 500;
      ctx.body = err.message;
      return;
    }
  };

  verifyEmail = async (ctx: Context) => {
    const params = ctx.query as {code: string, id: string};
    try{
      await this.service.verifyEmail(+params.code, +params.id);
      ctx.body = { success: true};
    }catch(err: any){
      if (err instanceof WrongCode){
        ctx.status = 400;
        ctx.body = err.message;
        return;
      }
      ctx.status = 500;
      ctx.body = err.message;
      return;
    }
  }

  passwordReset = async (ctx: Context) => {
    const user = ctx.request.body as { email: string};
    try{
      await this.service.passwordReset(user.email);
      ctx.body = {success: true};
    }catch(err: any){
      if(err instanceof WrongCredentials){
        ctx.status = 400;
        ctx.body = err.message;
        return;
      }
      ctx.status = 500;
      ctx.body = err.message;
      return;
    }
  }

  changePassword = async (ctx: Context) => {
    const user = ctx.request.body as {password: string, code: number}
    try{
      await this.service.changePassword(user.code, user.password);
      ctx.body = {success: true};
    }catch(err: any){
      if(err instanceof WrongCode){
        ctx.status = 400;
        ctx.body = err.message;
        return;
      }
      ctx.status = 500;
      ctx.body = err.message;
      return;
    }
  }
}
