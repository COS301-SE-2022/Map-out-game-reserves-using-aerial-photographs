/*
  Warnings:

  - You are about to drop the column `imagescol` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `videoID` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video_Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video_In_Collection` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `collectionID` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_videoID_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_collectionID_fkey";

-- DropForeignKey
ALTER TABLE "Video_Collection" DROP CONSTRAINT "Video_Collection_parkID_fkey";

-- DropForeignKey
ALTER TABLE "Video_In_Collection" DROP CONSTRAINT "Video_In_Collection_collectionID_fkey";

-- DropForeignKey
ALTER TABLE "Video_In_Collection" DROP CONSTRAINT "Video_In_Collection_videoID_fkey";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "imagescol",
DROP COLUMN "videoID",
ADD COLUMN     "collectionID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Video";

-- DropTable
DROP TABLE "Video_Collection";

-- DropTable
DROP TABLE "Video_In_Collection";

-- CreateTable
CREATE TABLE "Image_Collection" (
    "collectionID" SERIAL NOT NULL,
    "parkID" INTEGER NOT NULL,
    "upload_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "flightID" INTEGER NOT NULL,

    CONSTRAINT "Image_Collection_pkey" PRIMARY KEY ("collectionID")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_collectionID_fkey" FOREIGN KEY ("collectionID") REFERENCES "Image_Collection"("collectionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image_Collection" ADD CONSTRAINT "Image_Collection_flightID_fkey" FOREIGN KEY ("flightID") REFERENCES "Flight_Details"("flightID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image_Collection" ADD CONSTRAINT "Image_Collection_parkID_fkey" FOREIGN KEY ("parkID") REFERENCES "Game_Park"("parkID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_collectionID_fkey" FOREIGN KEY ("collectionID") REFERENCES "Image_Collection"("collectionID") ON DELETE RESTRICT ON UPDATE CASCADE;
