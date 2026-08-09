import { Router } from "express";
import { z } from "zod";

import { prisma } from "../../prisma/prismaClient";

export const diseaseRouter = Router();

const diseaseSchema = z.object({
  name: z.string().min(2, "Disease name is required"),
  organ: z.string().min(2, "Organ or body system is required"),
  suggestedDepartment: z.string().min(2, "Suggested department is required"),
  type: z.string().min(2, "Disease type is required"),
});

const defaultDiseases = [
  {
    name: "Malaria",
    organ: "Liver",
    suggestedDepartment: "General Medicine",
    type: "Top disease",
  },
  {
    name: "Dengue",
    organ: "Blood",
    suggestedDepartment: "General Medicine",
    type: "Seasonal disease",
  },
  {
    name: "Chikungunya",
    organ: "Joints",
    suggestedDepartment: "Orthopedic",
    type: "Seasonal disease",
  },
  {
    name: "Typhoid",
    organ: "Intestine",
    suggestedDepartment: "General Medicine",
    type: "Regional disease",
  },
  {
    name: "Flu",
    organ: "Respiratory System",
    suggestedDepartment: "General Medicine",
    type: "Top disease",
  },
];

const ensureDefaultDiseases = async () => {
  const diseaseCount = await prisma.disease.count();

  if (diseaseCount === 0) {
    await prisma.disease.createMany({
      data: defaultDiseases,
    });
  }
};

diseaseRouter.get(["/", "/list"], async (_request, response, next) => {
  try {
    await ensureDefaultDiseases();

    const diseases = await prisma.disease.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.status(200).json({
      data: diseases,
    });
  } catch (error) {
    next(error);
  }
});

diseaseRouter.post("/", async (request, response, next) => {
  try {
    const payload = diseaseSchema.parse(request.body);

    const disease = await prisma.disease.create({
      data: payload,
    });

    return response.status(201).json({
      message: "Disease created successfully",
      data: disease,
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

diseaseRouter.put("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const payload = diseaseSchema.parse(request.body);

    const existingDisease = await prisma.disease.findUnique({
      where: {
        id,
      },
    });

    if (!existingDisease) {
      return response.status(404).json({
        message: "Disease not found",
      });
    }

    const disease = await prisma.disease.update({
      where: {
        id,
      },
      data: payload,
    });

    return response.status(200).json({
      message: "Disease updated successfully",
      data: disease,
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

diseaseRouter.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const disease = await prisma.disease.delete({
      where: {
        id,
      },
    });

    return response.status(200).json({
      message: "Disease deleted successfully",
      data: disease,
    });
  } catch (error) {
    next(error);
  }
});
