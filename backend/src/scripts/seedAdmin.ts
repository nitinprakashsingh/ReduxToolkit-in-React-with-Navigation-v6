import "dotenv/config";
import bcrypt from "bcryptjs";

import { prisma } from "../prisma/prismaClient";

const email = process.env.ADMIN_EMAIL || "nitinprakashsingh2023@gmail.com";

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} must be set in backend/.env before seeding the admin user.`);
  }

  return value;
}

const password = requiredEnvironmentVariable("ADMIN_PASSWORD");

async function seedAdmin() {
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      name: "Admin",
      password: hashedPassword,
      role: "admin",
    },
    create: {
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  console.log(`Admin user ready: ${admin.email} (${admin.role})`);
}

seedAdmin()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
