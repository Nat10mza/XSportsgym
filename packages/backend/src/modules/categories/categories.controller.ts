import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../../db";

const paramsSchema = z.object({
  categoryId: z.coerce.number().int(),
});

const bodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
});

const getSchema = z.object({
  params: paramsSchema,
});

const createSchema = z.object({
  body: bodySchema,
});

const updateSchema = z.object({
  params: paramsSchema,
  body: bodySchema.partial(),
});

// Devuelve todos los productos.
export async function getAllCategories(req: Request, res: Response) {
  const categories = await prisma.category.findMany();
  return res.status(200).send(categories);
}

export async function getCategory(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const category = await prisma.category.findUniqueOrThrow({
    where: { id: params.categoryId },
  });
  return res.status(200).send(category);
}

export async function createCategory(req: Request, res: Response) {
  const { body: data } = await createSchema.parseAsync(req);
  const category = await prisma.category.create({ data });
  return res.status(200).json(category);
}

export async function updateCategory(req: Request, res: Response) {
  const { body, params } = await updateSchema.parseAsync(req);
  const category = await prisma.brand.update({
    where: { id: params.categoryId },
    data: body,
  });
  res.status(200).json(category);
}

export async function deleteCategory(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const category = await prisma.category.delete({
    where: { id: params.categoryId },
  });
  return res.status(200).json(category);
}
