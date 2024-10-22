import { Context } from "koa";
import { CartService } from "./cartService";
import { NotFound } from "./errors/NotFound";
import { NotAvailable } from "./errors/NotAvailable";
import { injectable } from "inversify";

@injectable()
export class CartController {
  constructor(private readonly service: CartService) {}

  addItemToCart = async (ctx: Context) => {
    const item = ctx.request.body as { itemId: number };
    try {
      await this.service.addItem(ctx.userId, item.itemId);
      ctx.body = { added: true };
    } catch (err) {
      if (err instanceof NotAvailable) {
        ctx.status = 404;
        ctx.body = err.message;
        return;
      }
    }
  };

  deleteFromCart = async (ctx: Context) => {
    const item = ctx.request.body as { itemId: number };
    try {
      await this.service.deleteFromCart(ctx.userId, item.itemId);
      ctx.body = { success: true };
    } catch (err) {
      if (err instanceof NotFound) {
        ctx.status = 404;
        ctx.body = err.message;
        return;
      }
    }
  };

  getCart = async (ctx: Context) => {
    ctx.body = await this.service.getCart(ctx.userId);
  };
}