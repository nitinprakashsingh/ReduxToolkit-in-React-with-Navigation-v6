import { Router } from "express";

import { prisma } from "../../prisma/prismaClient";

export const healthRouter = Router();

healthRouter.get("/", async (_request, response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    response.json({
      status: "ok",
      service: "hospital-panel-backend",
    });
  } catch {
    response.status(503).json({
      status: "unavailable",
      service: "hospital-panel-backend",
    });
  }
});
