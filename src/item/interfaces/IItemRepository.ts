import { ItemModel } from "../ItemModel";

export const ItemRepositoryToken = Symbol("ItemRepositoryToken");

export interface IItemRepository {
  createItem: (
    itemName: string,
    categoryId: number,
    count: number,
    price: number
  ) => Promise<ItemModel>;
  createCategory: (categoryName: string) => Promise<void>;
  deleteItem: (itemId: number) => Promise<void>;
  getItemsList: (limit: number, offset: number) => Promise<
    Array<ItemModel>
  >;
  changeCount: (count: number, itemId: number) => Promise<void>;
  changePrice: (price: number, itemId: number) => Promise<void>;
  findItem: (itemId: number) => Promise<ItemModel | null>;
  priceFilter: (sortBy: "ASC" | "DESC") => Promise< Array<{
    id: number;
    name: string;
    photo: string;
    category_id: number;
    count: number;
    price: number;
    created_at: Date;
  }>>;
  dateFilter: (sortBy: "ASC" | "DESC") => Promise< Array<{
    id: number;
    name: string;
    photo: string;
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
    photo: string;
    category_id: number;
    count: number;
    price: number;
    created_at: Date;
  }>>;
addPhoto: (url: string, id: number) => Promise<any>;
}
