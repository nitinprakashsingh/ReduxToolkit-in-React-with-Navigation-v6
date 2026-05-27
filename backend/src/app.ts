import cors from "cors";
import express from "express";

import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { appointmentRouter } from "./modules/appointments/appointment.routes";
import { bookingRouter } from "./modules/bookings/booking.routes";
import { departmentRouter } from "./modules/departments/department.routes";
import { diseaseRouter } from "./modules/diseases/disease.routes";
import { doctorRouter } from "./modules/doctors/doctor.routes";
import { healthRouter } from "./modules/health/health.routes";
import { packageRouter } from "./modules/packages/package.routes";
import { patientRouter } from "./modules/patients/patient.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { signInRouter } from "./modules/auth/login.route";
import { staffRouter } from "./modules/staff/staff.routes";
import { hospitalRouter } from "./modules/hospital/hospital.routes";

export const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
  })
);
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/packages", packageRouter);
app.use("/api/diseases", diseaseRouter);
app.use("/api/staff", staffRouter);
app.use("/api/auth", authRouter);
app.use("/api/auth/login", signInRouter);
app.use("/api/hospital", hospitalRouter);
app.use(errorHandler);
