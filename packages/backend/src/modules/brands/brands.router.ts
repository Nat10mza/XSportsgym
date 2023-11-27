import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} from "./brands.controller";

const brandsRouter = Router();

brandsRouter
  .get("/brands", getAllBrands)
  .post("/brands", createBrand)
  .get("/brands/:brandId", getBrand)
  .patch("/brands/:brandId", updateBrand)
  .delete("/brands/:brandId", deleteBrand);

export default brandsRouter;
