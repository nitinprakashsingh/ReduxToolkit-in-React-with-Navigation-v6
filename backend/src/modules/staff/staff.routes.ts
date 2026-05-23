import { Router } from "express";
import { z } from "zod";

import { prisma } from "../../prisma/prismaClient";

export const staffRouter = Router();

const staffSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  relationship: z.string().min(2, "Relationship is required"),
});

staffRouter.post("/", async (request, response, next) => {
  try {
    const payload = staffSchema.parse(request.body);

    const existingStaff = await prisma.staff.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (existingStaff) {
      return response.status(409).json({
        message: "Staff already exists with this email",
      });
    }

    const staff = await prisma.staff.create({
      data: payload,
    });

    return response.status(201).json({
      message: "Staff created successfully",
      data: staff,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }

    next(error);
  }
});

staffRouter.get("/list", async (_request, response, next) => {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.status(200).json({
      data: staff,
    });
  } catch (error) {
    next(error);
  }
});
