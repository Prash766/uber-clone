/*
  Warnings:

  - Added the required column `onboarding` to the `Captain` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Onboarding" AS ENUM ('pending', 'completed');

-- AlterTable
ALTER TABLE "Captain" ADD COLUMN     "onboarding" "Onboarding" NOT NULL;
