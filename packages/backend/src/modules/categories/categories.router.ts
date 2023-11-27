import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./categories.controller";

const categoriesRouter = Router();

categoriesRouter
  .get("/categories", getAllCategories)
  .post("/categories", createCategory)
  .get("/categories/:categoryId", getCategory)
  .patch("/categories/:categoryId", updateCategory)
  .delete("/categories/:categoryId", deleteCategory);

export default categoriesRouter;
