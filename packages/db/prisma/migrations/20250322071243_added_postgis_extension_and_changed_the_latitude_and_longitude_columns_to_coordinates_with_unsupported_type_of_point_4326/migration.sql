/*
  Warnings:

  - You are about to drop the column `Longitude` on the `CaptainLocation` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `CaptainLocation` table. All the data in the column will be lost.
  - Added the required column `coordinates` to the `CaptainLocation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- AlterTable
ALTER TABLE "CaptainLocation" DROP COLUMN "Longitude",
DROP COLUMN "latitude",
ADD COLUMN     "coordinates" geometry(Point , 4326) NOT NULL;

-- CreateIndex
CREATE INDEX "location_idx" ON "CaptainLocation" USING GIST ("coordinates");
