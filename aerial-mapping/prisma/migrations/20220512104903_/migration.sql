/*
  Warnings:

  - Changed the type of `flight_height` on the `Flight_Details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Flight_Details" DROP COLUMN "flight_height",
ADD COLUMN     "flight_height" DOUBLE PRECISION NOT NULL;
