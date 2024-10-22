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
exports.ItemController = void 0;
const itemService_1 = require("./itemService");
const NotFound_1 = require("./errors/NotFound");
const inversify_1 = require("inversify");
let ItemController = class ItemController {
    constructor(service) {
        this.service = service;
        this.create = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const item = ctx.request.body;
            const addItem = yield this.service.createItem(item.itemName, item.categoryId, item.count, item.price);
            ctx.body = { added: true };
        });
        this.createCategory = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const category = ctx.request.body;
            const createCategory = yield this.service.createCategory(category.categoryName);
            ctx.body = { added: true };
        });
        this.delete = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const item = ctx.request.body;
            try {
                yield this.service.deleteItemFromList(item.itemId);
                ctx.body = { success: true };
            }
            catch (err) {
                if (err instanceof NotFound_1.NotFound) {
                    ctx.status = 404;
                    ctx.body = err.message;
                    return;
                }
            }
        });
        this.changeCount = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const item = ctx.request.body;
            const changeCount = yield this.service.changeCount(item.count, item.itemId);
            ctx.body = { changed: true };
        });
        this.changePrice = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const item = ctx.request.body;
            const changePrice = yield this.service.changePrice(item.price, item.itemId);
            ctx.body = { changed: true };
        });
        this.getCart = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getItemsList();
            ctx.body = result;
        });
    }
};
exports.ItemController = ItemController;
exports.ItemController = ItemController = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [itemService_1.ItemService])
], ItemController);
