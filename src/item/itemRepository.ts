import { injectable } from "inversify";
import { Database } from "../infra/database";
import { IItemRepository } from "./interfaces/IItemRepository";

@injectable()
export class ItemRepository implements IItemRepository {
  constructor(private readonly database: Database) {}

  async createItem(itemName: string, categoryId: string, count: number, price: number) {
    return this.database.query(
      `
        insert into items (name, category_id, count, price)
        VALUES ($1, $2, $3, $4)
        `,
      [itemName, categoryId, count, price]
    );
  }

  async createCategory(categoryName: string) {
    return this.database.query(
      `
        insert into categories (name)
        VALUES ($1)
        `,
      [categoryName]
    );
  }

  async deleteItem(itemId: string) {
    return this.database.query(
      `
        DELETE 
        FROM items
        WHERE id = $1
        `,
      [itemId]
    );
  }

  async getItemsList(limit: number, offset: number) {
    const list = await this.database.query(
      `
        SELECT i.id, i.name, i.count, i.price, c.id as category_id, c.name as category_name
        from items i 
        inner join categories c on i.category_id = c.id
        limit  $1
        offset $2;
        `,
      [limit, offset]
    ) as unknown as { rows: Array<{
      id: number;
      name: string;
      count: number;
      price: number;
      category_id: number;
      category_name: string;
    }> }; 
    return list.rows
  }

  async changeCount(count: number, itemId: string) {
    return this.database.query(
      `
        UPDATE items
        SET count = $1
        WHERE id = $2
        `,
      [count, itemId]
    );
  }

  async changePrice(price: number, itemId: string) {
    return this.database.query(
      `
        UPDATE items
        SET price = $1
        WHERE id = $2
        `,
      [price, itemId]
    );
  }

  async findItem(itemId: string) {
    const item = await this.database.query(
      `
        SELECT *
        from items
        WHERE id = $1
        `,
      [itemId]
    );
    return item.rows[0];
  }

  async priceFilter(sortBy: string) {
    const item = await this.database.query(
      `
      SELECT * 
      FROM items 
      ORDER BY price ${sortBy};
      `, []);
    return item.rows;
  }

  async dateFilter(sortBy: string) {
    const item = await this.database.query(
      `
      SELECT * 
      FROM items 
      ORDER BY created_at $1
      `, [sortBy]);
    return item.rows;
  }

  async categoryFilter(category_id: number) {
    const item = await this.database.query(
      `
        SELECT *
        from items
        WHERE category_id = $1
        `,
      [category_id]
    );
    return item.rows;
  }
}
