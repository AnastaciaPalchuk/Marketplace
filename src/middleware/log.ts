import { Context, Next } from "koa";

export = (ctx: Context, next: Next) => {
    console.log(ctx.request);
    return next();
}