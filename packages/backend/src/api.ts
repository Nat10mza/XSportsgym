import express, { Router } from "express";
import session from "express-session";
import passport from "passport";

import { sessionConfig } from "./config";
import {
  clientErrorHandler,
  notFoundHandler,
  serverErrorHandler,
} from "./middleware/errorHandling";
import brandsRouter from "./modules/brands";
import categoriesRouter from "./modules/categories";
import productsRouter from "./modules/products";
import reviewsRouter from "./modules/reviews";
import facebookRouter from "./modules/users/facebook.routes";
import googleRouter from "./modules/users/google.routes";
import localRouter from "./modules/users/local.routes";
import usersRouter from "./modules/users/users.router";
import mailerRouter from "./modules/mailer/mailer.router";
import ordersRouter from "./modules/orders/orders.router";
import configRouter from "./modules/config/config.router";

const apiRouter = Router()
  // Middleware
  .use(express.json())
  .use(session(sessionConfig))
  .use(passport.initialize())
  .use(passport.session())

  // Routes
  .use(productsRouter)
  .use(brandsRouter)
  .use(categoriesRouter)
  .use(usersRouter)
  .use(reviewsRouter)
  .use(facebookRouter)
  .use(googleRouter)
  .use(localRouter)
  .use(mailerRouter)
  .use(ordersRouter)
  .use(configRouter)
  // Error handling
  .use(notFoundHandler)
  .use(clientErrorHandler)
  .use(serverErrorHandler);

export default apiRouter;
