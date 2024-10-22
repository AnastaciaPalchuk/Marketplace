"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const authController_1 = require("./auth/authController");
const authRepository_1 = require("./auth/authRepository");
const authService_1 = require("./auth/authService");
const database_1 = require("./infra/database");
const IAuthRepository_1 = require("./auth/interfaces/IAuthRepository");
const cartController_1 = require("./cart/cartController");
const ICartRepository_1 = require("./cart/interfaces/ICartRepository");
const cartRepository_1 = require("./cart/cartRepository");
const cartService_1 = require("./cart/cartService");
const itemController_1 = require("./item/itemController");
const IItemRepository_1 = require("./item/interfaces/IItemRepository");
const itemRepository_1 = require("./item/itemRepository");
const itemService_1 = require("./item/itemService");
const container = new inversify_1.Container();
exports.container = container;
container.bind(authController_1.AuthController).toSelf().inSingletonScope();
container
    .bind(IAuthRepository_1.AuthRepositoryToken)
    .to(authRepository_1.AuthRepository)
    .inSingletonScope();
container.bind(authService_1.AuthService).toSelf().inSingletonScope();
container.bind(database_1.Database).toSelf().inSingletonScope();
container.bind(cartController_1.CartController).toSelf().inSingletonScope();
container
    .bind(ICartRepository_1.CartRepositoryToken)
    .to(cartRepository_1.CartRepository)
    .inSingletonScope();
container.bind(cartService_1.CartService).toSelf().inSingletonScope();
container.bind(itemController_1.ItemController).toSelf().inSingletonScope();
container
    .bind(IItemRepository_1.ItemRepositoryToken)
    .to(itemRepository_1.ItemRepository)
    .inSingletonScope();
container.bind(itemService_1.ItemService).toSelf().inSingletonScope();
