import { injectable } from "inversify";
import { Database } from "../infra/dataSource";
import { IItemRepository } from "./interfaces/IItemRepository";
import { Item } from "./itemEntity";
import { Category } from "./categoryEntity";

@injectable()
export class ItemRepository implements IItemRepository {
  constructor(private readonly dataSource: Database) {}

  async createItem(itemName: string, categoryId: number, count: number, price: number) {
    const repo = this.dataSource.getRepository(Item);
    return repo.insert({
      name: itemName,
      category_id: categoryId,
      count: count,
      price: price
    })
  }

  async createCategory(categoryName: string) {
    const repo = this.dataSource.getRepository(Category);
    return repo.insert({
      name: categoryName
    })
  }

  async deleteItem(itemId: number) {
    const repo = this.dataSource.getRepository(Item);
    return repo.delete({id: itemId})
  }

  async getItemsList(limit: number, offset: number) {
    const list = await this.dataSource.getRepository(Item)
    .createQueryBuilder("i")
    .select([
      "i.id",
      "i.name",
      "i.count",
      "i.price",
      "i.photo",
      "c.id AS category_id",
      "c.name AS category_name",
    ])
    .innerJoin("i.category", "c")
    .limit(limit)
    .offset(offset)
    .getRawMany(); 
  return list;
  }

  async changeCount(count: number, itemId: number) {
    const repo = this.dataSource.getRepository(Item);
    return repo.update({id: itemId}, {count: count})
  }

  async changePrice(price: number, itemId: number) {
    const repo = this.dataSource.getRepository(Item);
    return repo.update({id: itemId}, {price: price})
  }

  async findItem(itemId: number) {
    const repo = this.dataSource.getRepository(Item);
    return repo.findOne({where: {id: itemId}})
  }

  async priceFilter(sortBy: "ASC" | "DESC") {
    const repo = this.dataSource.getRepository(Item);
    const items = await repo
    .createQueryBuilder("i")
    .select("*")
    .orderBy("i.price", sortBy)
    .getRawMany();
  return items;
  }

  async dateFilter(sortBy: "ASC" | "DESC") {
    const repo = this.dataSource.getRepository(Item);
    const items = await repo
    .createQueryBuilder("i")
    .select("*")
    .orderBy("i.created_at", sortBy)
    .getRawMany();
    return items;
  }

  async categoryFilter(category_id: number) {
    const repo = this.dataSource.getRepository(Item);
    const item = await repo.find({where: {category_id: category_id}})
    return item;
  }

  async addPhoto(url: string, id: number){
    const repo = this.dataSource.getRepository(Item);
    return repo.update({id: id}, {photo: url})
  }
}
