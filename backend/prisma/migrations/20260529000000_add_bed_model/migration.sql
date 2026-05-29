CREATE TABLE "Bed" (
    "id" TEXT NOT NULL,
    "bedNo" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "roomNo" TEXT,
    "bedType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Available',
    "patientName" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bed_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Bed_bedNo_key" ON "Bed"("bedNo");
