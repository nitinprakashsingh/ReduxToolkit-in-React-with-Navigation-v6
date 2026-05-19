import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../../prisma/prismaClient"; // reuse singleton

export const signInRouter = Router();

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// mounted at /api/auth/login in your app.ts (so define POST at "/")
signInRouter.post("/", async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { name: user.name, mobile: user.mobile ?? null },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: "Validation failed", errors: error.errors });
    }
    next(error);
  }
});