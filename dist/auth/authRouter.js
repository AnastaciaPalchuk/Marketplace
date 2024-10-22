"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const router_1 = __importDefault(require("@koa/router"));
const validation_1 = __importDefault(require("../middleware/validation"));
const authValidation_1 = __importDefault(require("./authValidation"));
const log_1 = __importDefault(require("../middleware/log"));
const IoC_1 = require("../IoC");
const authController_1 = require("./authController");
const controller = IoC_1.container.get(authController_1.AuthController);
const AuthRouter = new router_1.default();
AuthRouter.post("/signUp", log_1.default, (0, validation_1.default)(authValidation_1.default.UserSignUp), controller.create);
AuthRouter.post("/signIn", log_1.default, (0, validation_1.default)(authValidation_1.default.UserSignIn), controller.login);
module.exports = AuthRouter;
