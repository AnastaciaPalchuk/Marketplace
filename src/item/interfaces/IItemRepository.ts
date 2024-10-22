export const ItemRepositoryToken = Symbol("ItemRepositoryToken");

export interface IItemRepository {
  createItem: (
    itemName: string,
    categoryId: string,
    count: number,
    price: number
  ) => Promise<any>;
  createCategory: (categoryName: string) => Promise<any>;
  deleteItem: (itemId: string) => Promise<any>;
  getItemsList: () => Promise<
    Array<{
      id: number;
      name: string;
      count: number;
      price: number;
      category_id: number;
      category_name: string;
    }>
  >;
  changeCount: (count: number, itemId: string) => Promise<any>;
  changePrice: (price: number, itemId: string) => Promise<any>;
  findItem: (
    itemId: string
  ) => Promise<{
    rows: Array<{
      name: string;
      id: number;
      count: number;
      category_id: number;
    }>;
  }>;
}
