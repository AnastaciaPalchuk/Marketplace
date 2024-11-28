import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { Item } from "../itemEntity";

export const ItemRepositoryToken = Symbol("ItemRepositoryToken");

export interface IItemRepository {
  createItem: (
    itemName: string,
    categoryId: number,
    count: number,
    price: number
  ) => Promise<InsertResult>;
  createCategory: (categoryName: string) => Promise<void>;
  deleteItem: (itemId: number) => Promise<void>;
  getItemsList: (limit: number, offset: number) => Promise<
    Array<{
      id: number;
      name: string;
      count: number;
      price: number;
      photo: string;
      category_id: number;
      category_name: string;
    }>
  >;
  changeCount: (count: number, itemId: number) => Promise<void>;
  changePrice: (price: number, itemId: number) => Promise<void>;
  findItem: (itemId: number) => Promise<Item | null>;
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
