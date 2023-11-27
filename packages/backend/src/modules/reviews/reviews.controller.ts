import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../../db";

const paramsSchema = z.object({
  reviewId: z.coerce.number().int(),
});

const paramsSchemaGet = z.object({
  productId: z.coerce.number().int(),
});
const bodySchema = z.object({
  comments: z.string().min(3),
  score: z.number().min(1).max(5),
  productId: z.number().int(),
  userId: z.number().int(),
});

const getSchema = z.object({
  params: paramsSchema,
});

const getSchemaGet = z.object({
  params: paramsSchemaGet,
});

const createSchema = z.object({
  body: bodySchema,
});

const updateSchema = z.object({
  params: paramsSchema,
  body: bodySchema.partial(),
});

// Get Reviewes by productId
export async function getReviews(req: Request, res: Response) {
  const { params } = await getSchemaGet.parseAsync(req);
  const reviews = await prisma.review.findMany({
    where: { productId: params.productId },
    include: { product: true, user: true },
  });
  res.status(200).json(reviews);
}

// Update review, only can change comments and score.
export async function updateReview(req: Request, res: Response) {
  const { body, params } = await updateSchema.parseAsync(req);
  const review = await prisma.review.update({
    where: { id: params.reviewId },
    data: body,
  });
  res.status(200).json(review);
}

// Delete record review by reviewId
export async function deleteReview(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const review = await prisma.review.delete({
    where: { id: params.reviewId },
  });
  res.status(200).json(review);
}

//Create new review
export async function createReview(req: Request, res: Response) {
  const { body: data } = await createSchema.parseAsync(req);

  // Validate if the review exists in the data base (with same product and user)
  const reviews = await prisma.review.findMany({
    where: { productId: data.productId, userId: data.userId },
  });
  let review;
  // Create the review if it doen't exist with same product and user.
  if (reviews.length === 0) {
    review = await prisma.review.create({
      data,
    });
    res.status(200).json(review);
  } else res.status(200).send("Review exists with same product and user");
}
