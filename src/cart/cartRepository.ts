import { injectable } from "inversify";
import { Database } from "../infra/dataSource";
import { ICartRepository } from "./interfaces/ICartRepository";
import { Cart } from "./cartEntity";
import { count } from "console";
import { Item } from "../item/itemEntity";

@injectable()
export class CartRepository implements ICartRepository {
  constructor(private readonly dataSource: Database) {}

  async checkAvailability(itemId: number) {
    const repo = this.dataSource.getRepository(Item);
    const item = await repo.findOne({ where: { id: itemId } });
    return item!.count;
  }

  async checkItemInCart(userId: number, itemId: number) {
    const repo = this.dataSource.getRepository(Cart);
    const check = await repo.findOne({where: {user_id: userId, item_id: itemId },
    });
    return check;
  }

  async changeCartCount(count: number, userId: number, itemId: number) {
    const repo = this.dataSource.getRepository(Cart);
    const repoItem = this.dataSource.getRepository(Item);
    await repoItem.update({ id: itemId }, { count: count - 1 });
    return repo.update(
      { user_id: userId, item_id: itemId },
      { count: count + 1 }
    );
  }

  async addItemToCart(userId: number, itemId: number) {
    const repo = this.dataSource.getRepository(Cart);
    const repoItem = this.dataSource.getRepository(Item);
    const findItem = await repoItem.findOne({ where: { id: itemId } });
    const upd = await repoItem.update({ id: itemId }, { count: findItem!.count - 1 });
    const addItem = await repo.insert({
      user_id: userId,
      item_id: itemId,
      count: 1,
      price: findItem!.price,
    });
    return addItem;
  }
  async findItem(userId: number, itemId: number) {
    const repo = this.dataSource.getRepository(Cart);
    return repo.findOne({ where: { user_id: userId, item_id: itemId } });
  }

  async deleteFromCart(userId: number, itemId: number) {
    const repo = this.dataSource.getRepository(Item);
    const findItem = await repo.findOne({ where: { id: itemId } });
    await repo.update({ id: itemId }, { count: findItem!.count + 1 });
    const repoCart = this.dataSource.getRepository(Cart);
    const findInCart = await repoCart.findOne({where: {user_id: userId, item_id: itemId}})
    await repoCart.update(
      { user_id: userId, item_id: itemId },
      { count: findInCart!.count - 1 }
    );
  }

  async deleteItemFromCart(userId: number, itemId: number) {
    const repo = this.dataSource.getRepository(Cart);
    await repo.delete({ user_id: userId, item_id: itemId });
  }

  async getCart(userId: number) {
    const repo = this.dataSource.getRepository(Cart);
    const prices = await repo.find({ where: { user_id: userId } });
    const totalAmount = prices.reduce(
      (sum, current) => sum + current.price * current.count,
      0
    );
    const getAllItems = await repo
      .createQueryBuilder("c")
      .select([
        "c.id AS cart_id",
        "c.count AS count",
        "i.id AS item_id",
        "i.name AS item_name",
        "ct.name AS category_name",
        "u.name AS user_name",
      ])
      .innerJoin("c.item", "i")
      .innerJoin("i.category", "ct")
      .innerJoin("c.user", "u")
      .where("c.user_id = :userId", { userId })
      .getRawMany();

    return { Cart: getAllItems, Total: totalAmount / 100 };
  }
}
