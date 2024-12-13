import { injectable } from "inversify";
import { Database } from "../infra/database";
import { ICartRepository } from "./interfaces/ICartRepository";
import { CartModel } from "./CartModel";
import { count } from "console";
import { ItemModel } from "../item/ItemModel";
import { CategoryModel } from "../item/CategoryModel";
import { UserModel } from "../auth/UserModel";

@injectable()
export class CartRepository implements ICartRepository {
  constructor(private readonly dataSource: Database) {}

  async checkAvailability(itemId: number) {
    const item = await ItemModel.findOne({ where: { id: itemId } });
    return item!.count;
  }

  async checkItemInCart(userId: number, itemId: number) {
    const check = await CartModel.findOne({where: {user_id: userId, item_id: itemId },
    });
    return check;
  }

  async changeCartCount(count: number, userId: number, itemId: number) {
    await ItemModel.update({ count: count - 1 }, {where: { id: itemId }});
    return CartModel.update(
      { count: count + 1 },
      {where: { user_id: userId, item_id: itemId }}
    );
  }

  async addItemToCart(userId: number, itemId: number) {
    const findItem = await ItemModel.findOne({ where: { id: itemId } });
    const upd = await ItemModel.update({ count: findItem!.count - 1 }, {where: { id: itemId }});
    const addItem = await CartModel.create({
      user_id: userId,
      item_id: itemId,
      count: 1,
      price: findItem!.price,
    });
    return addItem;
  }
  async findItem(userId: number, itemId: number) {
    return CartModel.findOne({ where: { user_id: userId, item_id: itemId } });
  }

  async deleteFromCart(userId: number, itemId: number) {
    const findItem = await ItemModel.findOne({ where: { id: itemId } });
    await ItemModel.update({ count: findItem!.count + 1 }, {where: { id: itemId }});
    const findInCart = await CartModel.findOne({where: {user_id: userId, item_id: itemId}})
    await CartModel.update(
      { count: findInCart!.count - 1 },
      {where: { user_id: userId, item_id: itemId }}
    );
  }

  async deleteItemFromCart(userId: number, itemId: number) {
    await CartModel.destroy({where: {user_id: userId, item_id: itemId }});
  }

  async getCart(userId: number) {
    const prices = await CartModel.findAll({ where: { user_id: userId } });
    const totalAmount = prices.reduce(
      (sum, current) => sum + current.price * current.count,
      0
    );
    const getAllItems = await CartModel.findAll({
      attributes: [
        "id", "cart_id",
        "count", "count"
      ],
      include: [
        {
          model: ItemModel,
          as: "item",
          attributes: [
            "id", "item_id",
            "name", "item_name",
          ],
          include: [
            {
              model: CategoryModel,
              as: "category",
              attributes: ["name", "category_name"],
            },
          ],
        },
        {
          model: UserModel,
          as: "user",
          attributes: ["name", "user_name"],
        },
      ],
      where: {
        user_id: userId,
      },
      raw: true,
    });
    return { Cart: getAllItems, Total: totalAmount / 100 };
  }
}
