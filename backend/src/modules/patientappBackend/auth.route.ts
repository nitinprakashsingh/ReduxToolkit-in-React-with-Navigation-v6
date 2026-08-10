import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../../prisma/prismaClient";
import { env } from "../../config/env";

export const patientAuthRouter = Router();

const patientLoginSchema = z.object({
  mobile: z.string().min(10, "Valid mobile number is required"),
  otp: z.string().min(4, "OTP must be at least 4 characters"),
});

patientAuthRouter.post("/", async (request, response, next) => {
  try {
    const payload = patientLoginSchema.parse(request.body);

    if (payload.otp !== "1234") {
      return response.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const user = await prisma.user.findFirst({
      where: { mobile: payload.mobile },
    });

    if (!user) {
      return response.status(404).json({
        success: false,
        message: "No patient account found for this mobile number.",
      });
    }

    if (user.role !== "user") {
      return response.status(403).json({
        success: false,
        message: "This mobile number is not authorized for patient app access.",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        mobile: user.mobile,
      },
      env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
      },
    );

    return response.status(200).json({
      success: true,
      message: "Patient login successful",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }
    next(error);
  }
});
