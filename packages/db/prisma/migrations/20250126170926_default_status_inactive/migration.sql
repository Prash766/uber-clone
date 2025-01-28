/*
  Warnings:

  - Made the column `status` on table `Captain` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "VehicleType" ADD VALUE 'Auto';
ALTER TYPE "VehicleType" ADD VALUE 'Bike';

-- AlterTable
ALTER TABLE "Captain" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'inactive';
