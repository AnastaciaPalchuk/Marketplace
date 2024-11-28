import { inject, injectable } from "inversify";
import { NotAvailable } from "./errors/NotAvailable";
import { NotFound } from "./errors/NotFound";
import {
  CartRepositoryToken,
  ICartRepository,
} from "./interfaces/ICartRepository";
import { RedisConnection } from "../infra/redis";

@injectable()
export class CartService {
  constructor(
    @inject(CartRepositoryToken)
    private readonly repository: ICartRepository,
    private readonly redis: RedisConnection
  ) {}

  async addItem(userId: number, itemId: number) {
    const itemCount = await this.repository.checkAvailability(itemId);
    if (itemCount! > 0) {
      const itemInCart = await this.repository.checkItemInCart(userId, itemId);
      if (itemInCart) {
        return this.repository.changeCartCount(itemInCart.count, userId, itemId);
      } else {
        return this.repository.addItemToCart(userId, itemId);
      }
    } else {
      throw new NotAvailable();
    }
  }

  async deleteFromCart(userId: number, itemId: number) {
    const findItem = await this.repository.findItem(userId, itemId);
    console.log(findItem);
    if (findItem!.count > 1) {
      return this.repository.deleteFromCart(userId, itemId);
    } else if (findItem!.count === 1) {
      await this.repository.deleteItemFromCart(userId, itemId);
    } else {
      throw new NotFound();
    }
  }

  async getCart(userId: number) {
    const checkCache = await this.redis.query().get("cart");
    if (checkCache) {
      return JSON.parse(checkCache);
    } else {
    const cart = await this.repository.getCart(userId);
    await this.redis.query().set("cart", JSON.stringify(cart));
    return cart;
  }
}
}
