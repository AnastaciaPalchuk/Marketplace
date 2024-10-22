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
exports.ItemRepository = void 0;
const inversify_1 = require("inversify");
const database_1 = require("../infra/database");
let ItemRepository = class ItemRepository {
    constructor(database) {
        this.database = database;
    }
    createItem(itemName, categoryId, count, price) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.database.query(`
        insert into items (name, category_id, count, price)
        VALUES ($1, $2, $3, $4)
        `, [itemName, categoryId, count, price]);
        });
    }
    createCategory(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.database.query(`
        insert into categories (name)
        VALUES ($1)
        `, [categoryName]);
        });
    }
    deleteItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.database.query(`
        DELETE 
        FROM items
        WHERE id = $1
        `, [itemId]);
        });
    }
    getItemsList() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.database.query(`
        SELECT i.id, i.name, i.count, i.price, c.id as category_id, c.name as category_name
        from items i 
        inner join categories c on i.category_id = c.id
        `, []);
            return list.rows;
        });
    }
    changeCount(count, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.database.query(`
        UPDATE items
        SET count = $1
        WHERE id = $2
        `, [count, itemId]);
        });
    }
    changePrice(price, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.database.query(`
        UPDATE items
        SET price = $1
        WHERE id = $2
        `, [price, itemId]);
        });
    }
    findItem(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.database.query(`
        SELECT *
        from items
        WHERE id = $1
        `, [itemId]);
            return item.rows[0];
        });
    }
};
exports.ItemRepository = ItemRepository;
exports.ItemRepository = ItemRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [database_1.Database])
], ItemRepository);
