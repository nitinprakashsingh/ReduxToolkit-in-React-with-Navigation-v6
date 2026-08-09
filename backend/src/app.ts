import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { authenticate, requireAdmin } from "./middleware/authenticate";
import { appointmentRouter } from "./modules/HospitalBackend/appointments/appointment.routes";
import { bedRouter } from "./modules/HospitalBackend/beds/bed.routes";
import { bookingRouter } from "./modules/HospitalBackend/bookings/booking.routes";
import { departmentRouter } from "./modules/HospitalBackend/departments/department.routes";
import { diseaseRouter } from "./modules/HospitalBackend/diseases/disease.routes";
import { doctorRouter } from "./modules/HospitalBackend/doctors/doctor.routes";
import { healthRouter } from "./modules/HospitalBackend/health/health.routes";
import { packageRouter } from "./modules/HospitalBackend/packages/package.routes";
import { patientRouter } from "./modules/patients/patient.routes";
import { signInRouter } from "./modules/HospitalBackend/auth/login.route";
import { staffRouter } from "./modules/staff/staff.routes";
import { hospitalRouter } from "./modules/HospitalBackend/hospital/hospital.routes";
import { patientAppRouter } from "./modules/patientappBackend/patientapp.routes";

export const app = express();

// Most cloud platforms terminate TLS at one reverse proxy before forwarding requests here.
app.set("trust proxy", env.NODE_ENV === "production" ? 1 : false);
app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.CLIENT_URLS.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("This origin is not allowed to access the API."));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "100kb" }));

const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many sign-in attempts. Please try again in 15 minutes." },
});

app.use("/api/health", healthRouter);
app.use("/api/auth/login", loginRateLimit, signInRouter);

app.use(authenticate);
app.use(requireAdmin);
app.use("/api/departments", departmentRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/beds", bedRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/packages", packageRouter);
app.use("/api/diseases", diseaseRouter);
app.use("/api/staff", staffRouter);
app.use("/api/hospital", hospitalRouter);
app.use("/api/patientapp", patientAppRouter);
app.use(errorHandler);
