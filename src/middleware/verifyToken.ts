import jsonwebtoken from "jsonwebtoken";
import { Context, Next } from "koa";

export = (ctx: Context, next: Next) => {
   try { const token = ctx.headers.authorization!;
    if (!token) {
        ctx.status = 401;
        ctx.body = { message: 'Authorization token is required' };
        return;
    }
    const decoded = jsonwebtoken.verify(token, 'secret') as {id: string, access_type: string};
    ctx.userId = decoded.id;
    ctx.access = decoded.access_type;
    return next();
   }
   catch(error){
        ctx.status = 403;
        ctx.body = { message: 'Invalid token' };
   }
}
