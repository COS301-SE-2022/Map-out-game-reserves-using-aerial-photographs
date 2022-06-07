/*
  Warnings:

  - You are about to drop the column `file_location` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Images` table. All the data in the column will be lost.
  - Added the required column `bucket_name` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_name` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" DROP COLUMN "file_location",
DROP COLUMN "name",
ADD COLUMN     "bucket_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "file_name" TEXT NOT NULL;
