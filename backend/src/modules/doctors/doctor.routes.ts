import { Router } from "express";
import { z } from "zod";

import { prisma } from "../../prisma/prismaClient";

export const doctorRouter = Router();

const doctorSchema = z.object({
  name: z.string().min(2, "Doctor name is required"),
  speciality: z.string().min(2, "Speciality is required"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  startCareerDate: z.coerce.date({
    required_error: "Start career date is required",
    invalid_type_error: "Start career date is invalid",
  }),
  registrationNumber: z.string().min(2, "Registration number is required"),
  consultancyFees: z.coerce.number().positive("Consultancy fees must be greater than zero"),
  availableDays: z.string().min(2, "Available days are required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

doctorRouter.post("/", async (request, response, next) => {
  try {
    const payload = doctorSchema.parse(request.body);

    const existingDoctor = await prisma.doctor.findFirst({
      where: {
        OR: [
          { email: payload.email },
          { registrationNumber: payload.registrationNumber },
        ],
      },
    });

    if (existingDoctor) {
      return response.status(409).json({
        message: "Doctor already exists with this email or registration number",
      });
    }

    const doctor = await prisma.doctor.create({
      data: payload,
    });

    return response.status(201).json({
      message: "Doctor schedule created successfully",
      data: doctor,
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

doctorRouter.put("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const payload = doctorSchema.parse(request.body);

    const existingDoctor = await prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    if (!existingDoctor) {
      return response.status(404).json({
        message: "Doctor not found",
      });
    }

    const duplicateDoctor = await prisma.doctor.findFirst({
      where: {
        id: {
          not: id,
        },
        OR: [
          { email: payload.email },
          { registrationNumber: payload.registrationNumber },
        ],
      },
    });

    if (duplicateDoctor) {
      return response.status(409).json({
        message: "Another doctor already uses this email or registration number",
      });
    }

    const doctor = await prisma.doctor.update({
      where: {
        id,
      },
      data: payload,
    });

    return response.status(200).json({
      message: "Doctor schedule updated successfully",
      data: doctor,
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

doctorRouter.get(["/", "/list"], async (_request, response, next) => {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.status(200).json({
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
});
