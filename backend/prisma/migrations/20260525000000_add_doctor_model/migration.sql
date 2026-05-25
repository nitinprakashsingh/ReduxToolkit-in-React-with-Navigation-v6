CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "speciality" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "startCareerDate" TIMESTAMP(3) NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "consultancyFees" DECIMAL(10,2) NOT NULL,
    "availableDays" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");
CREATE UNIQUE INDEX "Doctor_registrationNumber_key" ON "Doctor"("registrationNumber");
