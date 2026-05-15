import { Router } from "express";

export const patientRouter = Router();

patientRouter.get("/", (_request, response) => {
  response.json({
    data: [],
  });
});
