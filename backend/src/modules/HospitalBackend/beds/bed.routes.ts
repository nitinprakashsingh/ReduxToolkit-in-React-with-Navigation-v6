import { Router } from "express";
import { z } from "zod";

import { prisma } from "../../prisma/prismaClient";

export const bedRouter = Router();

const bedSchema = z.object({
  bedNo: z.string().min(1, "Bed number is required"),
  ward: z.string().min(2, "Ward is required"),
  roomNo: z.string().optional(),
  bedType: z.string().min(2, "Bed type is required"),
  status: z.string().min(2, "Status is required").optional(),
  patientName: z.string().optional(),
  notes: z.string().optional(),
});

bedRouter.post("/", async (request, response, next) => {
  try {
    const payload = bedSchema.parse(request.body);

    const existingBed = await prisma.bed.findUnique({
      where: {
        bedNo: payload.bedNo,
      },
    });

    if (existingBed) {
      return response.status(409).json({
        message: "Bed already exists with this bed number",
      });
    }

    const bed = await prisma.bed.create({
      data: {
        ...payload,
        status: payload.status || "Available",
      },
    });

    return response.status(201).json({
      message: "Bed created successfully",
      data: bed,
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

bedRouter.get(["/", "/list"], async (_request, response, next) => {
  try {
    const beds = await prisma.bed.findMany({
      orderBy: [
        {
          ward: "asc",
        },
        {
          bedNo: "asc",
        },
      ],
    });

    return response.status(200).json({
      data: beds,
    });
  } catch (error) {
    next(error);
  }
});

bedRouter.put("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const payload = bedSchema.partial().parse(request.body);

    const existingBed = await prisma.bed.findUnique({
      where: {
        id,
      },
    });

    if (!existingBed) {
      return response.status(404).json({
        message: "Bed not found",
      });
    }

    if (payload.bedNo && payload.bedNo !== existingBed.bedNo) {
      const duplicateBed = await prisma.bed.findUnique({
        where: {
          bedNo: payload.bedNo,
        },
      });

      if (duplicateBed) {
        return response.status(409).json({
          message: "Another bed already uses this bed number",
        });
      }
    }

    const bed = await prisma.bed.update({
      where: {
        id,
      },
      data: payload,
    });

    return response.status(200).json({
      message: "Bed updated successfully",
      data: bed,
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

bedRouter.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const bed = await prisma.bed.delete({
      where: {
        id,
      },
    });

    return response.status(200).json({
      message: "Bed deleted successfully",
      data: bed,
    });
  } catch (error) {
    next(error);
  }
});
