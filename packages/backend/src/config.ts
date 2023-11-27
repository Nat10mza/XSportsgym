import { CorsOptions } from "cors";
import { SessionOptions } from "express-session";
import parseDuration from "parse-duration";
import { StrategyOption as FacebookStrategyOptions } from "passport-facebook";
import { StrategyOptions as GoogleStrategyOptions } from "passport-google-oauth20";

export const appOrigin = process.env.APP_ORIGIN || "http://localhost:8080";
export const clientOrigin =
  process.env.CLIENT_ORIGIN || "http://127.0.0.1:5173";

export const expressPort = (() => {
  const value = parseInt(process.env.EXPRESS_PORT || "8080");
  if (isNaN(value)) throw new Error("EXPRESS_PORT is not a valid number");
  return value;
})();

export const corsConfig: CorsOptions = {
  credentials: true,
  origin: process.env.CLIENT_ORIGIN || "http://127.0.0.1:5173",
};

export const sessionConfig: SessionOptions = (() => {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) throw new Error("SESSION_SECRET is not set");

  const sessionMaxAge = parseDuration(process.env.SESSION_MAXAGE || "31d");
  if (sessionMaxAge === null) throw new Error("SESSION_MAXAGE is invalid");

  return {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: "session.id",
    cookie: {
      maxAge: sessionMaxAge,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    },
  };
})();

export const facebookConfig: FacebookStrategyOptions = (() => {
  const clientID = process.env.FACEBOOK_ID;
  if (!clientID) throw new Error("FACEBOOK_ID is unset");

  const clientSecret = process.env.FACEBOOK_SECRET;
  if (!clientSecret) throw new Error("FACEBOOK_SECRET is unset");

  return {
    callbackURL: new URL("/api/auth/facebook/callback", appOrigin).toString(),
    clientID,
    clientSecret,
  };
})();

export const googleConfig: GoogleStrategyOptions = (() => {
  const clientID = process.env.GOOGLE_ID;
  if (!clientID) throw new Error("GOOGLE_ID is unset");

  const clientSecret = process.env.GOOGLE_SECRET;
  if (!clientSecret) throw new Error("GOOGLE_SECRET is unset");

  return {
    callbackURL: new URL("/api/auth/google/callback", appOrigin).toString(),
    clientID,
    clientSecret,
  };
})();
