-- CreateTable
CREATE TABLE "PackagePlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "duration" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "testsIncluded" INTEGER NOT NULL,
    "consultancyFree" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "durationMonths" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackagePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageSubscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "packagePlanId" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackageSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PackagePlan_tier_key" ON "PackagePlan"("tier");

-- CreateIndex
CREATE INDEX "PackageSubscription_packageName_idx" ON "PackageSubscription"("packageName");

-- AddForeignKey
ALTER TABLE "PackageSubscription" ADD CONSTRAINT "PackageSubscription_packagePlanId_fkey" FOREIGN KEY ("packagePlanId") REFERENCES "PackagePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
