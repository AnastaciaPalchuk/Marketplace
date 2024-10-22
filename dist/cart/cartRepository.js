"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const inversify_1 = require("inversify");
const database_1 = require("../infra/database");
let CartRepository = class CartRepository {
    constructor(database) {
        this.database = database;
    }
    checkAvailability(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.query(`
       SELECT items.count
        from items
        where id = $1;
        `, [itemId]);
            return result.rows[0].count;
        });
    }
    checkItemInCart(userId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.database.query(`
        SELECT cart.count
        from cart
        where user_id = $1 and item_id = $2;
        `, [userId, itemId]);
            return check.rows;
        });
    }
    changeCartCount(count, userId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.query(`
        UPDATE items
        SET count = count -1
        WHERE id = $1
        `, [itemId]);
            return this.database.query(`
        UPDATE cart
        SET count = $1 + 1
        WHERE user_id = $2 and item_id = $3;
        `, [count, userId, itemId]);
        });
    }
    addItemToCart(userId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.query(`
        UPDATE items
        SET count = count -1
        WHERE id = $1
        `, [itemId]);
            const addItem = yield this.database.query(`
          insert into cart (user_id, item_id, count) 
          VALUES ($1, $2, 1);
          `, [userId, itemId]);
            return addItem;
        });
    }
    findItem(userId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.database.query(`
        SELECT *
        from cart
        where user_id = $1 and item_id = $2;
        `, [userId, itemId]);
        });
    }
    deleteFromCart(userId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.database.query(`
        UPDATE items
        SET count = count + 1
        WHERE id = $1;
          `, [itemId]);
            return this.database.query(`
        UPDATE cart
        SET count = count - 1
        WHERE user_id = $1 and item_id = $2;
          `, [userId, itemId]);
        });
    }
    deleteItemFromCart(userId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.database.query(`
        DELETE
        FROM cart
        WHERE user_id = $1 and item_id = $2
        `, [userId, itemId]);
        });
    }
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAllItems = yield this.database.query(`
       SELECT c.id, c.count, i.id as item_id, i.name as item_name, ct.name as category_name, u.name as user_name
          from cart c
          inner join items i on c.item_id = i.id
          inner join categories ct on ct.id = i.category_id
          inner join users u on  c.user_id = u.id
          where user_id = $1;
          `, [userId]);
            return getAllItems.rows;
        });
    }
};
exports.CartRepository = CartRepository;
exports.CartRepository = CartRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [database_1.Database])
], CartRepository);
