import Router from "@koa/router";
import log from "../middleware/log";
import validation from "../middleware/validation";
import verifyToken from "../middleware/verifyToken";
import { ItemController } from "./itemController";
import itemValidation from "./itemValidation";
import checkPermission from "../middleware/checkPermission";
import { container } from "../IoC";

const controller = container.get(ItemController)
const ItemRouter = new Router();

ItemRouter.post('/addItem', log, validation(itemValidation.createItem), verifyToken, checkPermission, controller.create);
ItemRouter.post('/addCategory', log, validation(itemValidation.createCategory), verifyToken, checkPermission,  controller.createCategory);
ItemRouter.post('/changeCount', log, validation(itemValidation.changeCount), verifyToken, checkPermission, controller.changeCount);
ItemRouter.post('/changePrice', log, validation(itemValidation.changePrice), verifyToken, checkPermission, controller.changePrice);
ItemRouter.delete('/', log, validation(itemValidation.deleteItem), verifyToken, checkPermission, controller.delete);
ItemRouter.get('/', log, verifyToken, controller.getCart);

export = ItemRouter;
