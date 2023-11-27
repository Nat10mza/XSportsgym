import prisma from "../../db";
import { Request, Response } from "express";
import unimplemented from "../../utils/unimplemented";
import { z } from "zod";
import { encryptPassword } from "./encrypt";
import { Prisma } from "@prisma/client";

const paramsSchema = z.object({
  userId: z.coerce.number().int(),
});

const passwordSchema = z
  .string()
  .min(8, {
    message: "contener al menos 8 caracteres.",
  })
  .regex(/[a-z]/, {
    message: "contener al menos una letra minúscula.",
  })
  .regex(/[A-Z]/, {
    message: "contener al menos una letra mayúscula.",
  })
  .regex(/\d/, { message: "contener al menos un número." })
  .regex(/[@#$%^&+=!_]/, {
    message: "contener al menos un carácter especial.",
  });

const bodySchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().min(5),
  password: passwordSchema,
  role: z.enum(["USER", "ADMIN"]),
  state: z.string(),
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

const ignoreIfShorterThanThree = (value: any) => {
  if (value.length < 3) {
    return undefined;
  }
  return value;
};
const getAllSchema = z.object({
  query: z
    .object({
      id: z.coerce.number().int(),
      search: z.string().transform(ignoreIfShorterThanThree),
      email: z.string().transform(ignoreIfShorterThanThree),
      name: z.string().transform(ignoreIfShorterThanThree),
      role: z.string().transform(ignoreIfShorterThanThree),
      state: z.string().transform(ignoreIfShorterThanThree),
      page: z.coerce.number(),
      order: z.enum(["asc", "desc"]),
      column: z.string().transform(ignoreIfShorterThanThree),
      size: z.coerce.number(),
    })
    .partial(),
});

export async function getAllUsers(req: Request, res: Response) {
  const { query } = await getAllSchema.parseAsync(req);
  const where: Prisma.UserWhereInput = {
    name: { contains: query.search, mode: "insensitive" },
    email: query.email,
    role: query.role,
    state: query.state,
  };

  const select = {
    id: true,
    name: true,
    email: true,
    // Aquí excluimos la columna password por seguridad
    role: true,
    state: true,
  };

  const totalItems = await prisma.user.count({ where });
  //tamaño por defecto de la página 5
  const page_size = query.size ? query.size : 5;
  const users = await prisma.user.findMany({
    take: page_size,
    skip: query.page ? (query.page - 1) * page_size : undefined,
    where,
    orderBy: { ...(query.column ? { [query.column]: query.order } : {}) },
    select: select,
  });
  res.status(200).json({ totalItems, pageSize: page_size, users });
  /*const users = await prisma.user.findMany();
  return res.status(200).send(users)*/
}

export async function getUser(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: params.userId },
  });
  return res.status(200).send(user);
}

export async function createUser(req: Request, res: Response) {
  const { body: data } = await createSchema.parseAsync(req);
  const hashedPassword: string = await encryptPassword(data.password);
  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });
  return res.status(200).json({ state: "success", user: user });
}
export async function updateUser(req: Request, res: Response) {
  // TODO check password and catch
  const { body: data, params } = await updateSchema.parseAsync(req);
  const user = await prisma.user.update({
    where: { id: params.userId },
    data: { ...data },
  });
  return res.status(200).json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const { params } = await getSchema.parseAsync(req);
  const user = await prisma.user.delete({
    where: { id: params.userId },
  });
  return res.status(200).json(user);
}

// verificar autenticacion
export const isAuthenticated = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).json({
    status: "failed",
    message: "no tienes permisos o aun no estas autenticado",
  });
};

export async function UserAuthenticated(req: Request, res: Response) {
  res.json({
    state: "success",
    message: "bienvenido usuario de facebook",
    user: req.user,
  });
}
