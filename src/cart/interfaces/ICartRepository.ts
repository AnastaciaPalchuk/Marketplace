export const CartRepositoryToken = Symbol("CartRepositoryToken");

export interface ICartRepository {
  checkAvailability: (itemId: number) => Promise<number>;
  checkItemInCart: (
    userId: number,
    itemId: number
  ) => Promise<Array<{ count: number }>>;
  changeCartCount: (
    count: number,
    userId: number,
    itemId: number
  ) => Promise<any>;
  addItemToCart: (userId: number, itemId: number) => Promise<any>;
  findItem: (
    userId: number,
    itemId: number
  ) => Promise<{ rows: Array<{ count: number }> }>;
  deleteFromCart: (userId: number, itemId: number) => Promise<any>;
  deleteItemFromCart: (userId: number, itemId: number) => Promise<any>;
  getCart: (
    userId: number
  ) => Promise<
    Array<{
      id: number;
      count: number;
      item_id: number;
      item_name: string;
      category_name: string;
      user_name: string;
    }>
  >;
}
