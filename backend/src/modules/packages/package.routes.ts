import { Router } from "express";

export const packageRouter = Router();

packageRouter.get("/", (_request, response) => {
  response.json({
    data: [],
  });
});
