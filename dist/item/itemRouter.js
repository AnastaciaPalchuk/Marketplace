"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const router_1 = __importDefault(require("@koa/router"));
const log_1 = __importDefault(require("../middleware/log"));
const validation_1 = __importDefault(require("../middleware/validation"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const itemController_1 = require("./itemController");
const itemValidation_1 = __importDefault(require("./itemValidation"));
const checkPermission_1 = __importDefault(require("../middleware/checkPermission"));
const IoC_1 = require("../IoC");
const controller = IoC_1.container.get(itemController_1.ItemController);
const ItemRouter = new router_1.default();
ItemRouter.post('/addItem', log_1.default, (0, validation_1.default)(itemValidation_1.default.createItem), verifyToken_1.default, checkPermission_1.default, controller.create);
ItemRouter.post('/addCategory', log_1.default, (0, validation_1.default)(itemValidation_1.default.createCategory), verifyToken_1.default, checkPermission_1.default, controller.createCategory);
ItemRouter.post('/changeCount', log_1.default, (0, validation_1.default)(itemValidation_1.default.changeCount), verifyToken_1.default, checkPermission_1.default, controller.changeCount);
ItemRouter.post('/changePrice', log_1.default, (0, validation_1.default)(itemValidation_1.default.changePrice), verifyToken_1.default, checkPermission_1.default, controller.changePrice);
ItemRouter.delete('/', log_1.default, (0, validation_1.default)(itemValidation_1.default.deleteItem), verifyToken_1.default, checkPermission_1.default, controller.delete);
ItemRouter.get('/', log_1.default, verifyToken_1.default, controller.getCart);
module.exports = ItemRouter;
