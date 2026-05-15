import { Router } from "express";

export const doctorRouter = Router();

doctorRouter.get("/", (_request, response) => {
  response.json({
    data: [],
  });
});
