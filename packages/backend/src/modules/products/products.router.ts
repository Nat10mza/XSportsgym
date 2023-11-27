import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "./products.controller";

const productsRouter = Router();

productsRouter
  .get("/products", getAllProducts)
  .post("/products", createProduct)
  .get("/products/:productId", getProduct)
  .patch("/products/:productId", updateProduct)
  .delete("/products/:productId", deleteProduct);

export default productsRouter;
