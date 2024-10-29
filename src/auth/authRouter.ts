import Router from "@koa/router";
import validation from "../middleware/validation";
import authValidation from "./authValidation"
import log from "../middleware/log";
import { container } from "../IoC"
import { AuthController } from "./authController";

const controller = container.get(AuthController);
const AuthRouter = new Router();

AuthRouter.post("/signUp", log, validation(authValidation.UserSignUp), controller.create);
AuthRouter.post("/signIn",log, validation(authValidation.UserSignIn), controller.login);
AuthRouter.get("/emailVerify", log, controller.verifyEmail);
AuthRouter.post("/passwordReset", log, controller.passwordReset);
AuthRouter.post("/changePassword", log, controller.changePassword);

export = AuthRouter;
