import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../../db";
import slugid from "../../utils/slugid";
import transformDecimal from "../../utils/transformDecimal";

const paramsSchema = z.object({ productId: z.coerce.number().int() });

const bodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  imageUrl: z.string(),
  price: z.string().transform(transformDecimal),
  stock: z.number().int(),
  brandId: z.number().int(),
  categoryId: z.number().int(),
});

const getAllSchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int(),
      search: z.string(),
      categoryId: z.coerce.number().int(),
      brandId: z.coerce.number().int(),
      order: z.enum(["asc", "desc"]),
      column: z.enum(["name", "price"]),
      isTrashed: z.string().transform((value) => {
        return value === "true";
      }),
    })
    .partial(),
});

const getSchema = z.object({
  params: paramsSchema,
});

const createSchema = z.object({
  body: bodySchema,
});

const updateSchema = z.object({
  params: paramsSchema,
  body: bodySchema
    .extend({
      isTrashed: z.boolean(),
    })
    .partial(),
});

const createSlug = (value: string) =>
  `${value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")}-${slugid()}`;

const PAGE_SIZE = 5;

// Devuelve todos los productos.
export async function getAllProducts(req: Request, res: Response) {
  const { query } = await getAllSchema.parseAsync(req);

  const where: Prisma.ProductWhereInput = {
    name: { contains: query.search, mode: "insensitive" },
    categoryId: query.categoryId,
    brandId: query.brandId,
    isTrashed: query.isTrashed,
  };

  const totalItems = await prisma.product.count({ where });
  const products = await prisma.product.findMany({
    take: query.page ? PAGE_SIZE : undefined,
    skip: query.page ? (query.page - 1) * PAGE_SIZE : undefined,
    where,
    orderBy: { ...(query.column ? { [query.column]: query.order } : {}) },
    include: { brand: true, category: true },
  });
  res.status(200).json({ totalItems, pageSize: PAGE_SIZE, products });
}

// Devuelve un producto basado en su ID./ resultado {}
export async function getProduct(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: params.productId },
    include: { brand: true, category: true },
  });
  return res.status(200).json(product);
}

// Crea un nuevo producto.
export async function createProduct(req: Request, res: Response) {
  const {
    body: { brandId, categoryId, ...data },
  } = await createSchema.parseAsync(req);
  // Calculate the slug by parsing the provided name.
  // Added loop in case of unique constraint violation.
  let product = null;
  while (product === null) {
    const slug = createSlug(data.name);
    try {
      product = await prisma.product.create({
        data: {
          ...data,
          slug,
          category: { connect: { id: categoryId } },
          brand: { connect: { id: brandId } },
        },
      });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        continue;
      } else {
        throw err;
      }
    }
  }
  return res.status(201).json(product);
}

// Actualiza un producto basado en su ID.
export async function updateProduct(req: Request, res: Response) {
  const {
    body: { brandId, categoryId, ...data },
    params,
  } = await updateSchema.parseAsync(req);
  let product = null;
  while (product === null) {
    const slug =
      typeof data.name !== "undefined" ? createSlug(data.name) : undefined;
    try {
      product = await prisma.product.update({
        where: { id: params.productId },
        data: {
          ...data,
          slug,
          brandId: brandId,
          categoryId: categoryId,
        },
      });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        continue;
      } else {
        throw err;
      }
    }
  }
  return res.status(200).json(product);
}

// Borra un producto basado en su ID.
export async function deleteProduct(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const product = await prisma.product.delete({
    where: { id: params.productId },
  });
  return res.status(200).json(product);
}
