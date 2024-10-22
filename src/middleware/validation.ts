import { Context, Next } from "koa";
import { Schema } from "zod";

export = (schema: Schema) => {
    return function (ctx: Context, next: Next) {
      schema.parse(ctx.request.body);
      return next();
    };
  };
  