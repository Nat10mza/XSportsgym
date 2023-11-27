import { Router } from "express";
import { UserAuthenticated, isAuthenticated } from "./users.controller";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../../db";
import { z } from "zod";
import { comparePassword } from "./encrypt";
import { Request, Response } from "express";

const localRouter = Router();
const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  email: z.string().email().min(5),
  password: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  state: z.string(),
});
const passwordSchema = z
  .string()
  .min(8)
  .regex(/[a-z]/, {
    message: "La contraseña debe contener al menos una letra minúscula.",
  })
  .regex(/[A-Z]/, {
    message: "La contraseña debe contener al menos una letra mayúscula.",
  })
  .regex(/\d/, { message: "La contraseña debe contener al menos un número." })
  .regex(/[@#$%^&+=!_]/, {
    message: "La contraseña debe contener al menos un carácter especial.",
  });

const validEmail = z.string().email().min(5);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // nombre del campo de correo electrónico en el formulario
    },
    async (email, password, done) => {
      //console.log(email, password);
      try {
        // Buscar el usuario por su correo electrónico
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        const userVerified = await userSchema.parse(user);
        const isMatch = await comparePassword(userVerified.password, password);
        if (!isMatch) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
        // Si todo está bien, devolver el usuario autenticado
        return done(null, userVerified);
      } catch (error) {
        return done(null, false);
      }
    }
  )
);
passport.serializeUser((user: any, done) => {
  console.log(user);

  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

function validateUserData(req: Request, res: Response, next: any) {
  const { email, password } = req.body;
  validEmail.parse(email);
  passwordSchema.parse(password);
  next();
}

localRouter.post(
  "/localLogin",
  validateUserData, // Llamar a la función de validación antes de passport.authenticate
  passport.authenticate("local", { failureRedirect: "/failed" }),
  UserAuthenticated
);

export default localRouter;
