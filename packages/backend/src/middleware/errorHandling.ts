import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import logger from "../utils/logger";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    status: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
};

export const clientErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  // Skip if response has been sent already
  if (res.headersSent) return next(err);

  // JSON parse error
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      status: 400,
      message: "Invalid JSON body.",
    });
  }

  // Zod errors
  if (err instanceof ZodError) {
    return res.status(400).json({ status: 400, errors: err.issues });
  }

  // Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    console.dir(err);
    switch (err.code) {
      case "P2025": {
        if (
          err.name === "NotFoundError" ||
          ["DELETE", "PATCH"].includes(req.method)
        ) {
          return res.status(404).json({
            status: 404,
            message: "The requested resource does not exist.",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "An invalid ID was provided.",
          });
        }
      }

      case "P2003": {
        return res.status(400).json({
          status: 400,
          message: "An invalid ID was provided.",
        });
      }
      case "P2002": {
        console.log("mal consulta");
        return res.status(400).json({
          status: 400,
          message: "Unique constraint was provided",
        });
      }
    }
  }

  // Server error
  next(err);
};

export const serverErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
) => {
  // Skip if response has been sent already
  if (res.headersSent) return next(err);
  if (err instanceof Error) {
    logger.error(err.message);
    logger.debug(err.stack);
  } else {
    logger.error(err);
  }

  res.status(500).json({
    status: 500,
    message: "Internal server error.",
  });
};
