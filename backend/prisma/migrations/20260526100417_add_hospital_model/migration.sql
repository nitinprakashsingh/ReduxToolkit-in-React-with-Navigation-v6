-- CreateTable
CREATE TABLE "Hospital" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "licenseNumber" TEXT,
    "yearOfCommencement" TEXT,
    "ownership" TEXT,
    "noOfAmbulance" TEXT,
    "organsOperated" TEXT,
    "specialityOperations" TEXT,
    "facilities" JSONB,
    "totalArea" TEXT,
    "emergencyAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);
