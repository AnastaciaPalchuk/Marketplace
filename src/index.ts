import "reflect-metadata";
import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import bodyparser from "koa-bodyparser";
import config from "./config";
import AuthRouter from "./auth/authRouter";
import CartRouter from "./cart/cartRouter";
import ItemRouter from "./item/itemRouter";
import { container } from "./IoC";
import { Database } from "./infra/database";

async function main() {
  const database = container.get(Database);
  await database.connect();
  const router = new Router();
  const app = new Koa();

  router.use("/auth", AuthRouter.routes(), AuthRouter.allowedMethods());
  router.use("/cart", CartRouter.routes(), CartRouter.allowedMethods());
  router.use("/item", ItemRouter.routes(), ItemRouter.allowedMethods());

  app.use(cors());
  app.use(bodyparser());

  app.use(router.routes());
  app.listen(config.server.port, () =>
    console.log(`Started on port ${config.server.port}`)
  );
}
main();
