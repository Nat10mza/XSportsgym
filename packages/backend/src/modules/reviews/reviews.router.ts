import { Router } from "express";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "./reviews.controller";

const reviewsRouter = Router();

reviewsRouter
  .get("/reviews/:productId", getReviews)
  .post("/reviews", createReview)
  .patch("/reviews/:reviewId", updateReview)
  .delete("/reviews/:reviewId", deleteReview);

export default reviewsRouter;
