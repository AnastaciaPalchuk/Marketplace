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
exports.CartController = void 0;
const cartService_1 = require("./cartService");
const NotFound_1 = require("./errors/NotFound");
const NotAvailable_1 = require("./errors/NotAvailable");
const inversify_1 = require("inversify");
let CartController = class CartController {
    constructor(service) {
        this.service = service;
        this.addItemToCart = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const item = ctx.request.body;
            try {
                yield this.service.addItem(ctx.userId, item.itemId);
                ctx.body = { added: true };
            }
            catch (err) {
                if (err instanceof NotAvailable_1.NotAvailable) {
                    ctx.status = 404;
                    ctx.body = err.message;
                    return;
                }
            }
        });
        this.deleteFromCart = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const item = ctx.request.body;
            try {
                yield this.service.deleteFromCart(ctx.userId, item.itemId);
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
        this.getCart = (ctx) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = yield this.service.getCart(ctx.userId);
        });
    }
};
exports.CartController = CartController;
exports.CartController = CartController = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [cartService_1.CartService])
], CartController);
