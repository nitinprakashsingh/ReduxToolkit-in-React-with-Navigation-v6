import { Router } from "express";
import { z } from "zod";

import { prisma } from "../../prisma/prismaClient";

export const departmentRouter = Router();

const departmentSchema = z.object({
  name: z.string().min(2, "Department name is required"),
  headDoctor: z.string().optional(),
  phone: z.string().optional(),
  roomNo: z.string().optional(),
  status: z.string().optional(),
});

const defaultDepartments = [
  {
    name: "General Medicine",
    headDoctor: "Dr. Anil Mehta",
    phone: "9876543211",
    roomNo: "OPD-101",
    status: "Active",
  },
  {
    name: "Cardiology",
    headDoctor: "Dr. Rakesh Sinha",
    phone: "9123456781",
    roomNo: "OPD-204",
    status: "Active",
  },
  {
    name: "Dermatology",
    headDoctor: "Dr. Neha Sharma",
    phone: "9988776655",
    roomNo: "OPD-112",
    status: "Active",
  },
  {
    name: "Orthopedic",
    headDoctor: "Dr. Amit Verma",
    phone: "9012345678",
    roomNo: "OPD-305",
    status: "Inactive",
  },
  {
    name: "Pediatrics",
    headDoctor: "Dr. Kavita Rao",
    phone: "9876501234",
    roomNo: "OPD-118",
    status: "Active",
  },
];

const ensureDefaultDepartments = async () => {
  const departmentCount = await prisma.department.count();

  if (departmentCount === 0) {
    await prisma.department.createMany({
      data: defaultDepartments,
    });
  }
};

departmentRouter.get(["/", "/list"], async (_request, response, next) => {
  try {
    await ensureDefaultDepartments();

    const departments = await prisma.department.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.status(200).json({
      data: departments,
    });
  } catch (error) {
    next(error);
  }
});

departmentRouter.post("/", async (request, response, next) => {
  try {
    const payload = departmentSchema.parse(request.body);

    const department = await prisma.department.create({
      data: {
        name: payload.name,
        headDoctor: payload.headDoctor,
        phone: payload.phone,
        roomNo: payload.roomNo,
        status: payload.status ?? "Active",
      },
    });

    return response.status(201).json({
      message: "Department created successfully",
      data: department,
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

departmentRouter.put("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const payload = departmentSchema.parse(request.body);

    const existingDepartment = await prisma.department.findUnique({
      where: {
        id,
      },
    });

    if (!existingDepartment) {
      return response.status(404).json({
        message: "Department not found",
      });
    }

    const department = await prisma.department.update({
      where: {
        id,
      },
      data: payload,
    });

    return response.status(200).json({
      message: "Department updated successfully",
      data: department,
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

departmentRouter.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const department = await prisma.department.delete({
      where: {
        id,
      },
    });

    return response.status(200).json({
      message: "Department deleted successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
});
//test