import { Router } from "express";
import { z } from "zod";

import { prisma } from "../../prisma/prismaClient";

export const patientRouter = Router();

const patientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email().optional(),
  phone: z.string().min(7).optional(),
  address: z.string().optional(),
  gender: z.string().optional(),
  dob: z.string().optional(),
  age: z.number().int().positive().optional(),
  medicalRecordNumber: z.string().optional(),
  assignedDoctor: z.string().optional(),
  lastVisit: z.string().optional(),
  status: z.string().optional(),
});

patientRouter.post("/", async (request, response, next) => {
  try {
    const payload = patientSchema.parse(request.body);

    if (payload.email) {
      const existing = await prisma.patient.findUnique({ where: { email: payload.email } });
      if (existing) {
        return response.status(409).json({ message: "Patient already exists with this email" });
      }
    }

    if (payload.medicalRecordNumber) {
      const existingMrn = await prisma.patient.findUnique({ where: { medicalRecordNumber: payload.medicalRecordNumber } });
      if (existingMrn) {
        return response.status(409).json({ message: "Patient already exists with this medicalRecordNumber" });
      }
    }

    const patient = await prisma.patient.create({ data: payload as any });

    return response.status(201).json({ message: "Patient created successfully", data: patient });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({ message: "Validation failed", errors: error.errors });
    }
    next(error);
  }
});

patientRouter.get("/list", async (_request, response, next) => {
  try {
    const patients = await prisma.patient.findMany({ orderBy: { createdAt: "desc" } });
    return response.status(200).json({ data: patients });
  } catch (error) {
    next(error);
  }
});
