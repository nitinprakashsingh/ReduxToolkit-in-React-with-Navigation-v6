import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "../../prisma/prismaClient";

export const authRouter = Router();

const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobile: z.string().optional(),
  address: z.string().optional(),
});

authRouter.post("/signup", async (request, response, next) => {
  try {
    const payload = signupSchema.parse(request.body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (existingUser) {
      return response.status(409).json({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        mobile: payload.mobile,
        address: payload.address,
      },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        address: true,
        role: true,
        createdAt: true,
      },
    });

    return response.status(201).json({
      message: "User created successfully",
      data: user,
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