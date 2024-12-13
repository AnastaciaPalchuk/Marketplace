import { CartModel } from "../CartModel";

export const CartRepositoryToken = Symbol("CartRepositoryToken");

export interface ICartRepository {
  checkAvailability: (itemId: number) => Promise<number | undefined>;
  checkItemInCart: (
    userId: number,
    itemId: number
  ) => Promise<CartModel | null>;
  changeCartCount: (
    count: number,
    userId: number,
    itemId: number
  ) => Promise<any>;
  addItemToCart: (userId: number, itemId: number) => Promise<CartModel>;
  findItem: (
    userId: number,
    itemId: number
  ) => Promise<CartModel | null>;
  deleteFromCart: (userId: number, itemId: number) => Promise<void>;
  deleteItemFromCart: (userId: number, itemId: number) => Promise<void>;
  getCart: (
    userId: number
  ) => Promise<
    {Cart: Array<CartModel>, 
      Total: number
    }>;
}
