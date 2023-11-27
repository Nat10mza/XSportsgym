import { Router } from "express";
import { UserAuthenticated, isAuthenticated } from "./users.controller";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Request, Response } from "express";
import prisma from "../../db";
import crypto from "crypto";
import { z } from "zod";
import { encryptPassword } from "./encrypt";
import { appOrigin, clientOrigin, facebookConfig } from "../../config";

const facebookRouter = Router();

// validacion de la respuesta de facebook
const facebookSchema = z.object({
  id: z.string().min(1),
  email: z.string().email().optional(),
  name: z.string(),
});

// Estrategia de passport-facebook
passport.use(
  new FacebookStrategy(facebookConfig, async function (
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    try {
      const { email, name, id } = await facebookSchema.parseAsync(
        profile._json
      );
      // en caso no se tenga acceso a email
      let email_temp = email;
      // Concatenamos el nombre y el ID de Facebook del usuario
      const str = name + id;
      // Obtenemos el hash SHA256 de la cadena concatenada
      const hash = crypto.createHash("sha256").update("input").digest("hex");
      // Usamos las primeras 10 letras del hash como correo temporal
      email_temp = !email ? hash.slice(0, 10) + "@example.com" : email;
      //hashear el id que se usará como contraseña
      const hashedPassword: string = await encryptPassword(id);
      const user_created = await prisma.user.upsert({
        where: { email: email_temp },
        create: {
          email: email_temp,
          name: name,
          password: hashedPassword,
          role: "USER",
          state: "Active",
        },
        update: {},
      });
      return cb(null, user_created);
    } catch (error) {
      console.error(error);
      return cb(error);
    }
  })
);

passport.serializeUser(function (user: any, done) {
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

// rutas para login(auth , callback) ,logout , ruta de prueba y fallo
facebookRouter.get("/failed", (req, res) => {
  res.json({ state: "failed", message: "la autenticacion falló" });
});

facebookRouter.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

facebookRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/failed" }),
  function (req, res) {
    const respuesta = `<script>window.opener.postMessage({ isAuthenticated: true, user: ${JSON.stringify(
      req.user
    )} }, "${clientOrigin}"); window.close();</script>`;
    // Emitimos un mensaje al cliente indicando que se ha autenticado correctamente
    res.send(respuesta);
  }
);

facebookRouter.get("/privateUsers", isAuthenticated, UserAuthenticated);

facebookRouter.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send("deslogueado correctamente");
  });
});

export default facebookRouter;
