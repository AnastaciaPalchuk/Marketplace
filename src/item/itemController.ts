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
      categoryId: number;
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
    const item = ctx.request.body as { itemId: number };
    try {
      await this.service.deleteItemFromList(item.itemId);
      ctx.body = { success: true };
    } catch (err: any) {
      if (err instanceof NotFound) {
        ctx.status = 404;
        ctx.body = err.message;
        return;
      }
      ctx.status = 500;
      ctx.body = err.message;
      return;
    }
  };

  changeCount = async (ctx: Context) => {
    const item = ctx.request.body as { count: number; itemId: number };
    const changeCount = await this.service.changeCount(item.count, item.itemId);
    ctx.body = { changed: true };
  };

  changePrice = async (ctx: Context) => {
    const item = ctx.request.body as { price: number; itemId: number };
    const changePrice = await this.service.changePrice(item.price, item.itemId);
    ctx.body = { changed: true };
  };

  getList = async (ctx: Context) => {
    const params = ctx.query as {limit: string, page: string}
    const result = await this.service.getItemsList(+params.limit, +params.page -1);
    result.forEach(item => item.price = +item.price/100);
    ctx.body = result;
  };

  filterBy = async (ctx: Context) => {
    const queryParams = ctx.query;
    try {
      if (queryParams.price) {
        const sortBy = queryParams.price;
        const result = await this.service.filterByPrice(sortBy as "ASC" | "DESC");
        result.forEach(item => item.price = +item.price/100);
        ctx.body = result;
        return;
      }
      if (queryParams.createdAt) {
        const sortBy = queryParams.createdAt;
        const result = await this.service.filterByDate(sortBy as "ASC" | "DESC");
        result.forEach(item => item.price = +item.price/100);
        ctx.body = result;
        return;
      }
      if (queryParams.category) {
        const result = await this.service.filterByCategory(
          +queryParams.category
        );
        result.forEach(item => item.price = +item.price/100);
        ctx.body = result;
        return;

      } else {
        ctx.status = 404;
        ctx.body = "No such filter";
        return;
      }
    } catch (err: any) {
      if (err instanceof NotFound) {
        ctx.status = 404;
        ctx.body = err.message;
        return;
      }
      ctx.status = 500;
      ctx.body = err.message;
      return;
    }
  };

  updatePhoto = async(ctx: Context) => {
    const item = ctx.request.body as { id: number, photo: string,};
    try{
      const photoLink = await this.service.addPhoto(item.photo, item.id);
      console.log(photoLink)

      ctx.body = { photoLink };
      return;
    }
    catch(err: any){
      if(err instanceof NotFound){
        ctx.status = 404;
        ctx.body = err.message;
        return;
      }
      ctx.status = 500;
      ctx.body = err.message;
      return;
    }
  }
}
