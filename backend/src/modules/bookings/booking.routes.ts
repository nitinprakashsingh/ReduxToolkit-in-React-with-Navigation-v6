import { Router } from "express";
import { z } from "zod";

import { prisma } from "../../prisma/prismaClient";

export const bookingRouter = Router();

const bookingSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  patientEmail: z.string().email().optional(),
  patientPhone: z.string().min(7, "Phone number is required"),
  patientId: z.string().optional(),
  doctorName: z.string().min(2, "Doctor name is required"),
  doctorId: z.string().optional(),
  department: z.string().optional(),
  appointmentDate: z.coerce.date(),
  appointmentTime: z.string().min(1, "Appointment time is required"),
  consultancyFees: z.coerce.number().nonnegative().optional(),
  paymentMethod: z.string().optional(),
  paymentReceived: z.boolean().optional(),
  paymentAmount: z.coerce.number().nonnegative().optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
});

// Generate unique booking number
const generateBookingNumber = async () => {
  const count = await prisma.booking.count();
  return `BK-${String(count + 101).padStart(5, "0")}`;
};

// Create booking
bookingRouter.post("/", async (request, response, next) => {
  try {
    const payload = bookingSchema.parse(request.body);
    const bookingNo = await generateBookingNumber();

    const booking = await prisma.booking.create({
      data: {
        bookingNo,
        patientName: payload.patientName,
        patientEmail: payload.patientEmail,
        patientPhone: payload.patientPhone,
        patientId: payload.patientId,
        doctorName: payload.doctorName,
        doctorId: payload.doctorId,
        department: payload.department,
        appointmentDate: payload.appointmentDate,
        appointmentTime: payload.appointmentTime,
        consultancyFees: payload.consultancyFees || 0,
        paymentMethod: payload.paymentMethod || "Cash",
        paymentReceived: payload.paymentReceived || false,
        paymentAmount: payload.paymentAmount || 0,
        status: payload.status || "Pending",
        notes: payload.notes,
      },
    });

    return response.status(201).json({
      message: "Booking created successfully",
      data: booking,
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

// Get all bookings
bookingRouter.get(["/", "/list"], async (_request, response, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        appointmentDate: "desc",
      },
    });

    return response.status(200).json({
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
});

// Get booking by ID
bookingRouter.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return response.status(404).json({
        message: "Booking not found",
      });
    }

    return response.status(200).json({
      data: booking,
    });
  } catch (error) {
    next(error);
  }
});

// Update booking
bookingRouter.put("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const payload = bookingSchema.partial().parse(request.body);

    const booking = await prisma.booking.update({
      where: { id },
      data: payload as any,
    });

    return response.status(200).json({
      message: "Booking updated successfully",
      data: booking,
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

// Delete booking
bookingRouter.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const booking = await prisma.booking.delete({
      where: { id },
    });

    return response.status(200).json({
      message: "Booking deleted successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
});
