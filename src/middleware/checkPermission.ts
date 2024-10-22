import { Context, Next } from "koa";
import { NoAccess } from "../item/errors/NoAccess";

export = (ctx: Context, next: Next) => {
  if (ctx.access === "ADMIN") {
    return next();
  } else {
    const err = new NoAccess();
    ctx.status = 403;
    ctx.body = err.message;
    return;
  }
};


