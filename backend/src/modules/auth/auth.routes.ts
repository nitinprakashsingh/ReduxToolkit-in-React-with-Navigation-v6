import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "../../prisma/prismaClient";

export const authRouter = Router();

const forgotPasswordSchema = z.object({
  email: z.string().email("Valid email is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

authRouter.post("/forgot-password", async (request, response, next) => {
  try {
    const payload = forgotPasswordSchema.parse(request.body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!existingUser) {
      return response.status(404).json({
        message: "No account found with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

    await prisma.user.update({
      where: {
        email: payload.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return response.status(200).json({
      message: "Password reset successfully. Please sign in with your new password.",
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
