import { inject, injectable } from "inversify";
import { NotFound } from "./errors/NotFound";
import { IItemRepository, ItemRepositoryToken } from "./interfaces/IItemRepository";

@injectable()
export class ItemService {
  constructor(
    @inject(ItemRepositoryToken)
    private readonly repository: IItemRepository) {}

  async createItem(itemName: string, categoryId: string, count: number, price: number) {
    const newItemAdded = await this.repository.createItem(
      itemName,
      categoryId,
      count,
      price
    );
  }

  async createCategory(categoryName: string) {
    const categoryCreated = await this.repository.createCategory(categoryName);
  }

  async deleteItemFromList(itemId: string) {
    const findItem = await this.repository.findItem(itemId);
    if (findItem) {
      return this.repository.deleteItem(itemId);
    } else {
      throw new NotFound();
    }
  }

  async changeCount(count: number, itemId: string) {
    const findItem = await this.repository.findItem(itemId);
    if (findItem) {
      return this.repository.changeCount(count, itemId);
    } else {
      throw new NotFound();
    }
  }

  async changePrice(price: number, itemId: string) {
    const findItem = await this.repository.findItem(itemId);
    if (findItem) {
      return this.repository.changePrice(price, itemId);
    } else {
      throw new NotFound();
    }
  }

  async getItemsList() {
    return this.repository.getItemsList();
  }
}
