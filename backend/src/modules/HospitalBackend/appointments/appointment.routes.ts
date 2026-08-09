import { Router } from "express";

export const appointmentRouter = Router();

appointmentRouter.get("/", (_request, response) => {
  response.json({
    data: [],
  });
});
