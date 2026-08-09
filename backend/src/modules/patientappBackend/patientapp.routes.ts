import { Router } from "express";

export const patientAppRouter = Router();

patientAppRouter.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "PatientApp module is ready",
    module: "patientapp",
  });
});
