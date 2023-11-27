import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../../db";
import transformDecimal from "../../utils/transformDecimal";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.PRUEBA_ACCESS_TOKEN
    ? process.env.PRUEBA_ACCESS_TOKEN
    : "NO HAY TOQUEN  ",
});

const PAGE_SIZE = 5;

const paramsSchema = z.object({
  orderId: z.coerce.number().int(),
});

const bodySchema = z.object({
  userId: z.coerce.number().int(),
  total: z.number().min(1),
  products: z.array(
    z.object({
      productId: z.coerce.number().int(),
      price: z.string().transform(transformDecimal),
      quantity: z.number().int(),
      name: z.string().min(1),
    })
  ),
  payer: z.object({
    name: z.string().min(1),
    surname: z.string().min(1),
    email: z.string().email(),
    adress: z.object({
      street_name: z.string().min(1),
      street_number: z.number().int(),
    }),
    zip_code: z.number().int().min(1),
  }),
});

const getSchema = z.object({
  params: paramsSchema,
});

const createSchema = z.object({
  body: bodySchema,
});

const getAllSchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int(),
      userId: z.coerce.number().int(),
      order: z.enum(["asc", "desc"]),
      column: z.enum(["createdAt", "total"]),
      userName: z.string(),
    })
    .partial(),
});

// Get all orders
export async function getAllOrders(req: Request, res: Response) {
  const { query } = await getAllSchema.parseAsync(req);
  const where: Prisma.OrderWhereInput = {};
  if (query.userId) {
    where.userId = query.userId;
  } else if (query.userName) {
    where.user = {
      name: {
        contains: query.userName,
        mode: "insensitive",
      },
    };
  }
  const totalItems = await prisma.order.count({ where });
  const orders = await prisma.order.findMany({
    take: query.page ? PAGE_SIZE : undefined,
    skip: query.page ? (query.page - 1) * PAGE_SIZE : undefined,
    where,
    orderBy: { ...(query.column ? { [query.column]: query.order } : {}) },
    include: { user: true, products: true },
  });
  res.status(200).json({ totalItems, pageSize: PAGE_SIZE, orders });
}

//Get an order by id
export async function getOrder(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: params.orderId },
    include: { user: true, products: true },
  });
  res.status(200).json(order);
}

// Delete order and its related products
export async function deleteOrder(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  await prisma.ordersOnProducts.deleteMany({
    where: { orderId: params.orderId },
  });
  const order = await prisma.order.delete({
    where: { id: params.orderId },
  });
  res.status(200).json(order);
}

//Create order with user and total amount
export async function createOrder(req: Request, res: Response) {
  const { body: data } = await createSchema.parseAsync(req);
  const orderData = {
    userId: data?.userId,
    total: data.total,
  };
  const order = await prisma.order.create({ data: { ...orderData } });

  data.products.map(async (e) => {
    const orderProd = {
      productId: e.productId,
      orderId: order.id,
      quantity: e.quantity,
      price: e.price,
      name: e.name,
    };

    await prisma.ordersOnProducts.create({
      data: { ...orderProd },
    });

    const preference = {
      items: data.products.map((e) => {
        return {
          id: e.productId.toString(),
          quantity: e.quantity,
          unit_price: Number(e.price),
          title: e.name,
        };
      }),
      payer: data.payer,
      back_urls: {
        succes: "http://localhost:5173/products/shoppingcart/successful",
        pending: "http://localhost:5173/products/shoppingcart/pending",
        failure: "http://localhost:5173/products/shoppingcart/failed",
      },
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
        res.json({ global: response.body.id });
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
