import { inject, injectable } from "inversify";
import { NotAvailable } from "./errors/NotAvailable";
import { NotFound } from "./errors/NotFound";
import { CartRepositoryToken, ICartRepository } from "./interfaces/ICartRepository";

@injectable()
export class CartService {
  constructor(
    @inject(CartRepositoryToken)
    private readonly repository: ICartRepository) {}

  async addItem(userId: number, itemId: number) {
    const itemCount = await this.repository.checkAvailability(itemId);
    if (itemCount > 0) {
      const itemInCart = await this.repository.checkItemInCart(userId, itemId);
      if (itemInCart.length) {
        const cartCount = itemInCart[0].count;
        return this.repository.changeCartCount(
          cartCount,
          userId,
          itemId
        );
      } else {
        return this.repository.addItemToCart(userId, itemId);
      }
    } else {
      throw new NotAvailable();
    }
  }

  async deleteFromCart(userId: number, itemId: number) {
    const findItem = await this.repository.findItem(userId, itemId);
    console.log(findItem)
    if (findItem.rows[0].count > 1) {
      return this.repository.deleteFromCart(userId, itemId);
    } else if (findItem.rows[0].count === 1){
        await this.repository.deleteItemFromCart(userId, itemId);

    } else {
      throw new NotFound();
    }
  }

  async getCart(userId: number) {
    return this.repository.getCart(userId);
  }
}
