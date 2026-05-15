import { Router } from "express";

export const departmentRouter = Router();

departmentRouter.get("/", (_request, response) => {
  response.json({
    data: [],
  });
});
