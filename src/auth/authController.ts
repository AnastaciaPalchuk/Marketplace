import { Context } from "koa";
import { AuthService } from "./authService";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";
import { WrongCredentials } from "./errors/WrongCredentials";
import { injectable } from "inversify";
import { EmailNotVerifies } from "./errors/EmailNotVerified";
import { WrongCode } from "./errors/WrongCode";
import { ExpiredCode } from "./errors/ExpiredCode";

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
          id: userInfo.generatedMaps[0].id,
          name: user.name,
          surname: user.surname,
          email: user.email,
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
      if (err instanceof WrongCode || err instanceof ExpiredCode){
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
      const reset = await this.service.passwordReset(user.email);
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
    const user = ctx.request.body as {id: number, password: string, code: number}
    try{
      await this.service.changePassword(user.id, user.code, user.password);
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
