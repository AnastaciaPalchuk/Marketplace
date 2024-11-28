import { inject, injectable } from "inversify";
import { NotFound } from "./errors/NotFound";
import {
  IItemRepository,
  ItemRepositoryToken,
} from "./interfaces/IItemRepository";
import { AWSS3 } from "../utils/uploadS3";

@injectable()
export class ItemService {
  constructor(
    @inject(ItemRepositoryToken)
    private readonly repository: IItemRepository,
    private readonly s3: AWSS3
  ) {}

  async createItem(
    itemName: string,
    categoryId: number,
    count: number,
    price: number
  ) {
    const newItemAdded = await this.repository.createItem(
      itemName,
      +categoryId,
      count,
      price
    );
  }

  async createCategory(categoryName: string) {
    const categoryCreated = await this.repository.createCategory(categoryName);
  }

  async deleteItemFromList(itemId: number) {
    const findItem = await this.repository.findItem(itemId);
    if (findItem) {
      return this.repository.deleteItem(itemId);
    } else {
      throw new NotFound();
    }
  }

  async changeCount(count: number, itemId: number) {
    const findItem = await this.repository.findItem(itemId);
    if (findItem) {
      await this.repository.changeCount(count, itemId);
      return;
    } else {
      throw new NotFound();
    }
  }

  async changePrice(price: number, itemId: number) {
    const findItem = await this.repository.findItem(itemId);
    if (findItem) {
      await this.repository.changePrice(price, itemId);
      return;
    } else {
      throw new NotFound();
    }
  }

  async getItemsList(limit: number, page: number) {
    return this.repository.getItemsList(limit, page*limit);
  }

  async filterByPrice(sortBy: "ASC" | "DESC") {
    const priceFilter = await this.repository.priceFilter(sortBy);
    if (priceFilter) {
      return priceFilter;
    } else {
      throw new NotFound();
    }
  }

  async filterByDate(sortBy: "ASC" | "DESC"){
    const priceFilter = await this.repository.priceFilter(sortBy);
    if (priceFilter) {
      return priceFilter;
    } else {
      throw new NotFound();
    }
  }

  async filterByCategory(category_id: number){
    const categoryFilter = await this.repository.categoryFilter(category_id);
    if (categoryFilter) {
      return categoryFilter;
    } else {
      throw new NotFound();
    }
  }

    async addPhoto(photo: string, id: number){
      console.log(id)
      const photoUrl = await this.s3.uploadS3(photo, 'items', `photos_${id}`);
      const addedPhoto = await this.repository.addPhoto(photoUrl, id);
      if(addedPhoto){
        return photoUrl;
      } else{
      throw new NotFound();
    }
  }
}
