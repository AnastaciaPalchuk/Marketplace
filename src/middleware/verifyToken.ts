import jsonwebtoken from "jsonwebtoken";
import { Context, Next } from "koa";

export = (ctx: Context, next: Next) => {
    const token = ctx.headers.authorization!;
    const decoded = jsonwebtoken.verify(token, 'secret') as {id: string, access_type: string};
    ctx.userId = decoded.id;
    ctx.access = decoded.access_type;
    return next();
}
