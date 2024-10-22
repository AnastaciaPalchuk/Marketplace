"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const config_1 = __importDefault(require("./config"));
const authRouter_1 = __importDefault(require("./auth/authRouter"));
const cartRouter_1 = __importDefault(require("./cart/cartRouter"));
const itemRouter_1 = __importDefault(require("./item/itemRouter"));
const IoC_1 = require("./IoC");
const database_1 = require("./infra/database");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const database = IoC_1.container.get(database_1.Database);
        yield database.connect();
        const router = new router_1.default();
        const app = new koa_1.default();
        router.use("/auth", authRouter_1.default.routes(), authRouter_1.default.allowedMethods());
        router.use("/cart", cartRouter_1.default.routes(), cartRouter_1.default.allowedMethods());
        router.use("/item", itemRouter_1.default.routes(), itemRouter_1.default.allowedMethods());
        app.use((0, cors_1.default)());
        app.use((0, koa_bodyparser_1.default)());
        app.use(router.routes());
        app.listen(config_1.default.server.port, () => console.log(`Started on port ${config_1.default.server.port}`));
    });
}
main();
