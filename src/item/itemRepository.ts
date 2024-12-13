import { injectable } from "inversify";
import { Database } from "../infra/database";
import { IItemRepository } from "./interfaces/IItemRepository";
import { ItemModel } from "./ItemModel";
import { CategoryModel} from "./CategoryModel";
import { Sequelize } from "sequelize-typescript";

@injectable()
export class ItemRepository implements IItemRepository {
  constructor(private readonly dataSource: Database) {}

  async createItem(itemName: string, categoryId: number, count: number, price: number) {
    return ItemModel.create({
      name: itemName,
      category_id: categoryId,
      count: count,
      price: price
    })
  }

  async createCategory(categoryName: string) {
    await CategoryModel.create({
      name: categoryName
    })
  }

  async deleteItem(itemId: number) {
    await ItemModel.destroy({where: {id: itemId}})
  }

  async getItemsList(limit: number, offset: number) {
    const list = await ItemModel.findAll({
      attributes: [
        "id",
        "name",
        "count",
        "price",
        "photo",
        [Sequelize.col("category.id"), "category_id"],
        [Sequelize.col("category.name"), "category_name"],
      ],
      include: [
        {
          model: CategoryModel,
          as: "category",
          attributes: [],
        },
      ],
      limit,
      offset,
      raw: true,
    });
  
    return list;
  }

  async changeCount(count: number, itemId: number) {
    await ItemModel.update({count: count}, {where: {id: itemId}})
  }

  async changePrice(price: number, itemId: number) {
    await ItemModel.update({price: price}, {where: {id: itemId}})
  }

  async findItem(itemId: number) {
    return ItemModel.findOne({where: {id: itemId}})
  }

  async priceFilter(sortBy: "ASC" | "DESC") {
    const items = await ItemModel.findAll({
      attributes: ["*"],
      order: [["price", sortBy]],
      raw: true,
    });
  return items;
  }

  async dateFilter(sortBy: "ASC" | "DESC") {
    const items = await ItemModel.findAll({
      attributes: ["*"],
      order: [["created_at", sortBy]],
      raw: true,
    });
    return items;
  }

  async categoryFilter(category_id: number) {
    const item = await ItemModel.findAll({where: {category_id: category_id}})
    return item;
  }

  async addPhoto(url: string, id: number){
    return ItemModel.update({photo: url}, {where: {id: id}})
  }
}
