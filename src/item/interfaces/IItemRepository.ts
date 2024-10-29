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
  getItemsList: (limit: number, offset: number) => Promise<
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
  findItem: (itemId: string) => Promise<{
    rows: Array<{
      name: string;
      id: number;
      count: number;
      category_id: number;
    }>;
  }>;
  priceFilter: (sortBy: string) => Promise< Array<{
    id: number;
    name: string;
    category_id: number;
    count: number;
    price: number;
    created_at: Date;
  }>>;
  dateFilter: (sortBy: string) => Promise< Array<{
    id: number;
    name: string;
    category_id: number;
    count: number;
    price: number;
    created_at: Date;
  }>>;
  categoryFilter: (
    category_id: number
  ) => Promise< Array <{
    id: number;
    name: string;
    category_id: number;
    count: number;
    price: number;
    created_at: Date;
  }>>;
}
