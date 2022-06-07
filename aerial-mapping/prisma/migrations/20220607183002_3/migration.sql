/*
  Warnings:

  - Made the column `bucket_name` on table `Images` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Images" ALTER COLUMN "bucket_name" SET NOT NULL;
