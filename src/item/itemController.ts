import { Context } from "koa";
import { ItemService } from "./itemService";
import { NotFound } from "./errors/NotFound";
import { injectable } from "inversify";

@injectable()
export class ItemController {
  constructor(private readonly service: ItemService) {}

  create = async (ctx: Context) => {
    const item = ctx.request.body as {
      itemName: string;
      categoryId: string;
      count: number;
      price: number;
    };

    const addItem = await this.service.createItem(
      item.itemName,
      item.categoryId,
      item.count,
      item.price
    );
    ctx.body = { added: true };
  };

  createCategory = async (ctx: Context) => {
    const category = ctx.request.body as {
      categoryName: string;
    };

    const createCategory = await this.service.createCategory(
      category.categoryName
    );
    ctx.body = { added: true };
  };

  delete = async (ctx: Context) => {
    const item = ctx.request.body as { itemId: string };
    try {
      await this.service.deleteItemFromList(item.itemId);
      ctx.body = { success: true };
    } catch (err) {
      if (err instanceof NotFound) {
        ctx.status = 404;
        ctx.body = err.message;
        return;
      }
    }
  };

  changeCount = async (ctx: Context) => {
    const item = ctx.request.body as { count: number; itemId: string };
    const changeCount = await this.service.changeCount(item.count, item.itemId);
    ctx.body = { changed: true };
  };

  changePrice = async (ctx: Context) => {
    const item = ctx.request.body as { price: number; itemId: string };
    const changePrice = await this.service.changePrice(item.price, item.itemId);
    ctx.body = { changed: true };
  };

  getList = async (ctx: Context) => {
    const result = await this.service.getItemsList();
    ctx.body = result;
  };
}