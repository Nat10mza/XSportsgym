import { Router } from "express";
import {
  getAllOrders,
  createOrder,
  //  createProductOrder,
  getOrder,
  deleteOrder,
} from "./orders.controller";

const ordersRouter = Router();

ordersRouter
  .get("/orders", getAllOrders)
  .post("/orders", createOrder)
  // .post("/ordersProduct", createProductOrder)
  .get("/orders/:orderId", getOrder)
  .delete("/orders/:orderId", deleteOrder);

export default ordersRouter;
