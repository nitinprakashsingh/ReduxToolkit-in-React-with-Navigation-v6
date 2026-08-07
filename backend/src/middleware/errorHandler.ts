import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { env } from "../config/env";

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  console.error(error);

  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation failed",
      errors: error.flatten(),
    });
  }

  return response.status(500).json({
    message: "Something went wrong",
    ...(env.NODE_ENV !== "production" ? { error: error.message } : {}),
  });
};
