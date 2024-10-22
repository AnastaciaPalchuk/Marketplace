"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const router_1 = __importDefault(require("@koa/router"));
const cartController_1 = require("./cartController");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const validation_1 = __importDefault(require("../middleware/validation"));
const cartValidation_1 = __importDefault(require("./cartValidation"));
const log_1 = __importDefault(require("../middleware/log"));
const IoC_1 = require("../IoC");
const CartRouter = new router_1.default();
const controller = IoC_1.container.get(cartController_1.CartController);
CartRouter.post('/', log_1.default, verifyToken_1.default, (0, validation_1.default)(cartValidation_1.default.addItem), controller.addItemToCart);
CartRouter.delete('/', log_1.default, verifyToken_1.default, (0, validation_1.default)(cartValidation_1.default.deleteFromCart), controller.deleteFromCart);
CartRouter.get('/', log_1.default, verifyToken_1.default, (0, validation_1.default)(cartValidation_1.default.getCart), controller.getCart);
module.exports = CartRouter;
