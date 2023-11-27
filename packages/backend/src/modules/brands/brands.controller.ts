import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../../db";

const paramsSchema = z.object({
  brandId: z.coerce.number().int(),
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

export async function getAllBrands(req: Request, res: Response) {
  const brands = await prisma.brand.findMany();
  res.status(200).json(brands);
}

export async function getBrand(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const brand = await prisma.brand.findUniqueOrThrow({
    where: { id: params.brandId },
  });
  res.status(200).json(brand);
}

export async function updateBrand(req: Request, res: Response) {
  const { body, params } = await updateSchema.parseAsync(req);
  const brand = await prisma.brand.update({
    where: { id: params.brandId },
    data: body,
  });
  res.status(200).json(brand);
}

export async function deleteBrand(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const brand = await prisma.brand.delete({
    where: { id: params.brandId },
  });
  res.status(200).json(brand);
}

export async function createBrand(req: Request, res: Response) {
  const { body: data } = await createSchema.parseAsync(req);
  const brand = await prisma.brand.create({ data });
  res.status(200).json(brand);
}
