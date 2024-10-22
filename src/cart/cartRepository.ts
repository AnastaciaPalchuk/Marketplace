import { injectable } from "inversify";
import { Database } from "../infra/database";
import { ICartRepository } from "./interfaces/ICartRepository";

@injectable()
export class CartRepository implements ICartRepository {
  constructor(private readonly database: Database) {}

  async checkAvailability(itemId: number) {
    const result = await this.database.query(
      `
       SELECT items.count
        from items
        where id = $1;
        `,
      [itemId]
    );
    return result.rows[0].count;
  }

  async checkItemInCart(userId: number, itemId: number) {
    const check = await this.database.query(
      `
        SELECT cart.count
        from cart
        where user_id = $1 and item_id = $2;
        `,
      [userId, itemId]
    );
    return check.rows;
  }

  async changeCartCount(count: number, userId: number, itemId: number) {
    await this.database.query(
      `
        UPDATE items
        SET count = count -1
        WHERE id = $1
        `,
      [itemId]
    );

    return this.database.query(
      `
        UPDATE cart
        SET count = $1 + 1
        WHERE user_id = $2 and item_id = $3;
        `,
      [count, userId, itemId]
    );
  }

  async addItemToCart(userId: number, itemId: number) {
    await this.database.query(
      `
        UPDATE items
        SET count = count -1
        WHERE id = $1
        `,
      [itemId]
    );

    const addItem = await this.database.query(
      `
          insert into cart (user_id, item_id, count) 
          VALUES ($1, $2, 1);
          `,
      [userId, itemId]
    );
    return addItem;
  }
  async findItem(userId: number, itemId: number) {
    return this.database.query(
      `
        SELECT *
        from cart
        where user_id = $1 and item_id = $2;
        `,
      [userId, itemId]
    );
  }

  async deleteFromCart(userId: number, itemId: number) {
    this.database.query(
      `
        UPDATE items
        SET count = count + 1
        WHERE id = $1;
          `,
      [itemId]
    );

    return this.database.query(
      `
        UPDATE cart
        SET count = count - 1
        WHERE user_id = $1 and item_id = $2;
          `,
      [userId, itemId]
    );
  }

  async deleteItemFromCart(userId: number, itemId: number) {
    return this.database.query(
      `
        DELETE
        FROM cart
        WHERE user_id = $1 and item_id = $2
        `,
      [userId, itemId]
    );
  }

  async getCart(userId: number) {
    const getAllItems = await this.database.query(
      `
       SELECT c.id, c.count, i.id as item_id, i.name as item_name, ct.name as category_name, u.name as user_name
          from cart c
          inner join items i on c.item_id = i.id
          inner join categories ct on ct.id = i.category_id
          inner join users u on  c.user_id = u.id
          where user_id = $1;
          `,
      [userId]
    );

    return getAllItems.rows;
  }
}
