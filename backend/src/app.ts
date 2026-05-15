import cors from "cors";
import express from "express";

import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { appointmentRouter } from "./modules/appointments/appointment.routes";
import { departmentRouter } from "./modules/departments/department.routes";
import { diseaseRouter } from "./modules/diseases/disease.routes";
import { doctorRouter } from "./modules/doctors/doctor.routes";
import { healthRouter } from "./modules/health/health.routes";
import { packageRouter } from "./modules/packages/package.routes";
import { patientRouter } from "./modules/patients/patient.routes";

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
app.use("/api/packages", packageRouter);
app.use("/api/diseases", diseaseRouter);

app.use(errorHandler);
