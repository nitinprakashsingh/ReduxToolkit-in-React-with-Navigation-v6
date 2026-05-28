import { Router } from "express";
import { z } from "zod";

import { prisma } from "../../prisma/prismaClient";

export const packageRouter = Router();

const packagePlanSchema = z.object({
  name: z.string().min(2, "Package name is required"),
  price: z.coerce.number().nonnegative("Price must not be negative"),
  duration: z.string().min(2, "Duration is required"),
  department: z.string().min(2, "Department is required"),
  testsIncluded: z.coerce.number().int().nonnegative(),
  consultancyFree: z.coerce.number().int().nonnegative(),
  description: z.string().min(2, "Description is required"),
  tier: z.string().min(2, "Package tier is required"),
  durationMonths: z.coerce.number().int().positive(),
  status: z.string().optional(),
});

const subscriptionSchema = z.object({
  name: z.string().min(2, "User name is required"),
  phone: z.string().min(7, "Phone number is required"),
  packageName: z.string().min(2, "Package is required"),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  status: z.string().optional(),
});

const defaultPackagePlans = [
  {
    name: "Silver Health Check",
    price: 999,
    duration: "1 Month",
    department: "General Medicine",
    testsIncluded: 4,
    consultancyFree: 1,
    description: "Basic health check with one free doctor consultation.",
    tier: "Silver",
    durationMonths: 1,
  },
  {
    name: "Gold Family Care",
    price: 2499,
    duration: "3 Months",
    department: "General Medicine",
    testsIncluded: 8,
    consultancyFree: 3,
    description: "Routine tests and consultations for regular family care.",
    tier: "Gold",
    durationMonths: 3,
  },
  {
    name: "Platinum Complete Care",
    price: 4999,
    duration: "6 Months",
    department: "Multi Department",
    testsIncluded: 15,
    consultancyFree: 6,
    description: "Complete package for preventive health and follow-up visits.",
    tier: "Platinum",
    durationMonths: 6,
  },
];

const ensureDefaultPackagePlans = async () => {
  const packageCount = await prisma.packagePlan.count();

  if (packageCount === 0) {
    await prisma.packagePlan.createMany({
      data: defaultPackagePlans,
      skipDuplicates: true,
    });
  }
};

const addMonths = (date: Date, months: number) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

packageRouter.get(["/", "/list"], async (_request, response, next) => {
  try {
    await ensureDefaultPackagePlans();

    const packagePlans = await prisma.packagePlan.findMany({
      orderBy: {
        price: "asc",
      },
    });

    return response.status(200).json({
      data: packagePlans,
    });
  } catch (error) {
    next(error);
  }
});

packageRouter.post("/", async (request, response, next) => {
  try {
    const payload = packagePlanSchema.parse(request.body);

    const existingPackage = await prisma.packagePlan.findUnique({
      where: {
        tier: payload.tier,
      },
    });

    if (existingPackage) {
      return response.status(409).json({
        message: "Package already exists for this tier",
      });
    }

    const packagePlan = await prisma.packagePlan.create({
      data: payload,
    });

    return response.status(201).json({
      message: "Package created successfully",
      data: packagePlan,
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

packageRouter.put("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const payload = packagePlanSchema.partial().parse(request.body);

    const packagePlan = await prisma.packagePlan.update({
      where: {
        id,
      },
      data: payload,
    });

    return response.status(200).json({
      message: "Package updated successfully",
      data: packagePlan,
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

packageRouter.get("/subscriptions", async (request, response, next) => {
  try {
    const packageName =
      typeof request.query.packageName === "string" ? request.query.packageName : undefined;

    const subscriptions = await prisma.packageSubscription.findMany({
      where: packageName ? { packageName } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.status(200).json({
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
});

packageRouter.post("/subscriptions", async (request, response, next) => {
  try {
    await ensureDefaultPackagePlans();
    const payload = subscriptionSchema.parse(request.body);

    const packagePlan = await prisma.packagePlan.findUnique({
      where: {
        tier: payload.packageName,
      },
    });

    if (!packagePlan) {
      return response.status(404).json({
        message: "Package not found",
      });
    }

    const startDate = payload.startDate ?? new Date();
    const endDate = payload.endDate ?? addMonths(startDate, packagePlan.durationMonths);
    const status = payload.status ?? (endDate < new Date() ? "Expired" : "Active");

    const subscription = await prisma.packageSubscription.create({
      data: {
        name: payload.name,
        phone: payload.phone,
        packageName: packagePlan.tier,
        packagePlanId: packagePlan.id,
        startDate,
        endDate,
        status,
      },
    });

    return response.status(201).json({
      message: "Package subscribed successfully",
      data: subscription,
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
