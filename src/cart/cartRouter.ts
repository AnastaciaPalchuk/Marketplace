import Router from "@koa/router";
import { CartController } from "./cartController";
import verifyToken from "../middleware/verifyToken"
import validation from "../middleware/validation";
import cartValidation from "./cartValidation";
import log from "../middleware/log";
import { container } from "../IoC";

const CartRouter = new Router();
const controller = container.get(CartController);

CartRouter.post('/',log, verifyToken, validation(cartValidation.addItem), controller.addItemToCart)
CartRouter.delete('/',log, verifyToken, validation(cartValidation.deleteFromCart), controller.deleteFromCart)
CartRouter.get('/',log, verifyToken,validation(cartValidation.getCart), controller.getCart)

export = CartRouter;
