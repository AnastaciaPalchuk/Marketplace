import { InsertResult } from "typeorm";
import { Cart } from "../cartEntity";

export const CartRepositoryToken = Symbol("CartRepositoryToken");

export interface ICartRepository {
  checkAvailability: (itemId: number) => Promise<number | undefined>;
  checkItemInCart: (
    userId: number,
    itemId: number
  ) => Promise<Cart | null>;
  changeCartCount: (
    count: number,
    userId: number,
    itemId: number
  ) => Promise<any>;
  addItemToCart: (userId: number, itemId: number) => Promise<InsertResult>;
  findItem: (
    userId: number,
    itemId: number
  ) => Promise<Cart | null>;
  deleteFromCart: (userId: number, itemId: number) => Promise<void>;
  deleteItemFromCart: (userId: number, itemId: number) => Promise<void>;
  getCart: (
    userId: number
  ) => Promise<
    {Cart: Array<{
      id: number;
      count: number;
      item_id: number;
      item_name: string;
      category_name: string;
      user_name: string;}>, 
      Total: number
    }>;
}
