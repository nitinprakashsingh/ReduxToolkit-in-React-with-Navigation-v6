import { Router } from "express";

export const diseaseRouter = Router();

diseaseRouter.get("/", (_request, response) => {
  response.json({
    data: [],
  });
});
