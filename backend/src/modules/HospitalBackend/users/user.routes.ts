import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../../../prisma/prismaClient";

export const userRouter = Router();

const createUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required").optional(),
  mobile: z.string().min(10, "Mobile number is required").optional(),
  address: z.string().optional(),
  role: z.enum(["admin", "manager", "live_responsist", "user"]),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

const updateUserSchema = z.object({
  name: z.string().min(2, "Name is required").optional(),
  email: z.string().email("Valid email is required").optional(),
  mobile: z.string().min(10, "Mobile number is required").optional(),
  address: z.string().optional(),
  role: z.enum(["admin", "manager", "live_responsist", "user"]).optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

userRouter.post("/", async (request, response, next) => {
  try {
    const payload = createUserSchema.parse(request.body);

    if (!payload.email && !payload.mobile) {
      return response.status(400).json({
        message: "Please provide either email or mobile when creating a user.",
      });
    }

    if (payload.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (existingEmail) {
        return response.status(409).json({
          message: "A user already exists with this email.",
        });
      }
    }

    if (payload.mobile) {
      const existingMobile = await prisma.user.findFirst({
        where: { mobile: payload.mobile },
      });

      if (existingMobile) {
        return response.status(409).json({
          message: "A user already exists with this mobile number.",
        });
      }
    }

    const rawPassword = payload.password || payload.mobile || Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        mobile: payload.mobile,
        address: payload.address,
        role: payload.role,
        password: hashedPassword,
      },
    });

    return response.status(201).json({
      message: "User created successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        address: user.address,
      },
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

userRouter.get("/list", async (_request, response, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        address: true,
        createdAt: true,
      },
    });

    return response.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/patients", async (_request, response, next) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "user" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        address: true,
        createdAt: true,
      },
    });

    return response.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:userId", async (request, response, next) => {
  try {
    const payload = updateUserSchema.parse(request.body);
    const { userId } = request.params;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return response.status(404).json({ message: "User not found." });
    }

    if (payload.email) {
      const duplicateEmail = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (duplicateEmail && duplicateEmail.id !== userId) {
        return response.status(409).json({ message: "Another user already uses this email." });
      }
    }

    if (payload.mobile) {
      const duplicateMobile = await prisma.user.findFirst({
        where: { mobile: payload.mobile, id: { not: userId } as any },
      });

      if (duplicateMobile) {
        return response.status(409).json({ message: "Another user already uses this mobile number." });
      }
    }

    const updateData: any = {
      ...payload,
    };

    if (payload.password) {
      updateData.password = await bcrypt.hash(payload.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return response.status(200).json({
      message: "User updated successfully",
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        role: updatedUser.role,
        address: updatedUser.address,
      },
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

userRouter.delete("/:userId", async (request, response, next) => {
  try {
    const { userId } = request.params;
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return response.status(404).json({ message: "User not found." });
    }

    await prisma.user.delete({ where: { id: userId } });

    return response.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
});
