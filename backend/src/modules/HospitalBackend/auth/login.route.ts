import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../../../prisma/prismaClient"; // reuse singleton
import { env } from "../../../config/env";

export const signInRouter = Router();

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const verifyEmailSchema = z.object({
  email: z.string().email("Valid email is required"),
});

const setPasswordSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// mounted at /api/auth/login in your app.ts (so define POST at "/")
signInRouter.post("/", async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        mobile: true,
        role: true,
        address: true,
      },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      env.JWT_SECRET,
      { subject: user.id, expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        mobile: user.mobile ?? null,
        role: user.role,
        address: user.address ?? null,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: "Validation failed", errors: error.errors });
    }
    next(error);
  }
});

signInRouter.post("/verify-email", async (req, res, next) => {
  try {
    const payload = verifyEmailSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { id: true, email: true, role: true },
    });

    if (!user || user.role !== "user") {
      return res.status(404).json({ success: false, message: "Email not found for a patient user." });
    }

    return res.status(200).json({ success: true, message: "Email verified. Please set your password." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: "Validation failed", errors: error.errors });
    }
    next(error);
  }
});

signInRouter.post("/set-password", async (req, res, next) => {
  try {
    const payload = setPasswordSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { id: true, role: true },
    });

    if (!user || user.role !== "user") {
      return res.status(404).json({ success: false, message: "Email not found for a patient user." });
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ success: true, message: "Password has been set successfully." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: "Validation failed", errors: error.errors });
    }
    next(error);
  }
});
