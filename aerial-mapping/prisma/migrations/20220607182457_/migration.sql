/*
  Warnings:

  - You are about to alter the column `file_name` on the `Images` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Images" ALTER COLUMN "bucket_name" DROP NOT NULL,
ALTER COLUMN "file_name" SET DATA TYPE VARCHAR(100);
