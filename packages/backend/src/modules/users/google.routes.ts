import { Router } from "express";
import { UserAuthenticated, isAuthenticated } from "./users.controller";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { z } from "zod";
import prisma from "../../db";
import { encryptPassword } from "./encrypt";
import { clientOrigin, googleConfig } from "../../config";

const googleRouter = Router();

const googleSchema = z.object({
  email: z.string().email(),
  name: z.string(),
});

const idSchema = z.object({
  id: z.string().min(1),
});

passport.use(
  new GoogleStrategy(googleConfig, async function (
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    const { email, name } = await googleSchema.parseAsync(profile._json);
    const { id } = await idSchema.parseAsync(profile);
    const useremail = email;
    const hashedPassword: string = await encryptPassword(id);

    const user_created = await prisma.user.upsert({
      where: { email: useremail },
      create: {
        email: useremail,
        name: name,
        password: hashedPassword,
        role: "USER",
        state: "Active",
      },
      update: {},
    });
    return cb(null, user_created);
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

googleRouter.get("/failed", (req, res) => {
  res.json({ state: "failed", message: "la autenticacion fallo" });
});

googleRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),

  function (req, res) {
    const respuesta = `<script>window.opener.postMessage({ isAuthenticated: true, user: ${JSON.stringify(
      req.user
    )} }, "${clientOrigin}"); window.close();</script>`;
    res.send(respuesta);
  }
);

googleRouter.get("/prUsers", isAuthenticated, UserAuthenticated);

googleRouter.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send("deslogueado correctamente");
  });
});

export default googleRouter;
