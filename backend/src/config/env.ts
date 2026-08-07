import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const clientUrls = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);
const jwtSecret = process.env.JWT_SECRET || "";

if (isProduction && !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in production.");
}

if (isProduction && jwtSecret.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters in production.");
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 5000),
  CLIENT_URLS: clientUrls,
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: jwtSecret,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "8h",
};
