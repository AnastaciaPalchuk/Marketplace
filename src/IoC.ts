import { Container } from "inversify";
import { AuthController } from "./auth/authController";
import { AuthRepository } from "./auth/authRepository";
import { AuthService } from "./auth/authService";
import { Database } from "./infra/database";
import {
  AuthRepositoryToken,
  IAuthRepository,
} from "./auth/interfaces/IAuthRepository";
import { CartController } from "./cart/cartController";
import {
  CartRepositoryToken,
  ICartRepository,
} from "./cart/interfaces/ICartRepository";
import { CartRepository } from "./cart/cartRepository";
import { CartService } from "./cart/cartService";
import { ItemController } from "./item/itemController";
import { IItemRepository, ItemRepositoryToken } from "./item/interfaces/IItemRepository";
import { ItemRepository } from "./item/itemRepository";
import { ItemService } from "./item/itemService";
import { Mail } from "./mail/mailService";

const container = new Container();

container.bind(AuthController).toSelf().inSingletonScope();
container
  .bind<IAuthRepository>(AuthRepositoryToken)
  .to(AuthRepository)
  .inSingletonScope();
container.bind(AuthService).toSelf().inSingletonScope();
container.bind(Database).toSelf().inSingletonScope();

container.bind(CartController).toSelf().inSingletonScope();
container
  .bind<ICartRepository>(CartRepositoryToken)
  .to(CartRepository)
  .inSingletonScope();
container.bind(CartService).toSelf().inSingletonScope();

container.bind(ItemController).toSelf().inSingletonScope();
container
  .bind<IItemRepository>(ItemRepositoryToken)
  .to(ItemRepository)
  .inSingletonScope();
container.bind(ItemService).toSelf().inSingletonScope();

container.bind(Mail).toSelf().inSingletonScope();

export { container };
