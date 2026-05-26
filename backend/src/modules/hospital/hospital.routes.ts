import { Router } from "express";
import { z } from "zod";

import { prisma } from "../../prisma/prismaClient";

export const hospitalRouter = Router();

const hospitalSchema = z.object({
  name: z.string().min(2).optional(),
  address: z.string().optional(),
  licenseNumber: z.string().optional(),
  yearOfCommencement: z.string().optional(),
  ownership: z.string().optional(),
  noOfAmbulance: z.string().optional(),
  organsOperated: z.string().optional(),
  specialityOperations: z.string().optional(),
  facilities: z.any().optional(),
  totalArea: z.string().optional(),
  emergencyAvailable: z.boolean().optional(),
});

// Get hospital profile (returns first hospital)
hospitalRouter.get("/", async (_request, response, next) => {
  try {
    const hospital = await prisma.hospital.findFirst();

    if (!hospital) {
      return response.status(404).json({ message: "Hospital not found" });
    }

    return response.status(200).json({ data: hospital });
  } catch (error) {
    next(error);
  }
});

// Update hospital profile. If no hospital exists, create one.
hospitalRouter.put("/", async (request, response, next) => {
  try {
    const payload = hospitalSchema.parse(request.body);

    const existing = await prisma.hospital.findFirst();

    if (existing) {
      const updated = await prisma.hospital.update({
        where: { id: existing.id },
        data: payload as any,
      });

      return response.status(200).json({ message: "Hospital updated", data: updated });
    }

    const created = await prisma.hospital.create({ data: payload as any });

    return response.status(201).json({ message: "Hospital created", data: created });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({ message: "Validation failed", errors: error.errors });
    }
    next(error);
  }
});
