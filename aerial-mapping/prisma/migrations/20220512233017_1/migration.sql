/*
  Warnings:

  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_collectionID_fkey";

-- DropTable
DROP TABLE "message";

-- CreateTable
CREATE TABLE "Message" (
    "messageID" SERIAL NOT NULL,
    "message_status" TEXT NOT NULL,
    "message_description" TEXT NOT NULL,
    "collectionID" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageID")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_collectionID_fkey" FOREIGN KEY ("collectionID") REFERENCES "Video_Collection"("collectionID") ON DELETE RESTRICT ON UPDATE CASCADE;
