-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "licenseExpiry" TIMESTAMP(3),
ADD COLUMN     "licenseNumber" TEXT,
ADD COLUMN     "licenseState" TEXT;
