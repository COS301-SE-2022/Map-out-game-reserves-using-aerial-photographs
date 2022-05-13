-- CreateTable
CREATE TABLE "message" (
    "messageID" SERIAL NOT NULL,
    "message_status" TEXT NOT NULL,
    "message_description" TEXT NOT NULL,
    "collectionID" INTEGER NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("messageID")
);

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_collectionID_fkey" FOREIGN KEY ("collectionID") REFERENCES "Video_Collection"("collectionID") ON DELETE RESTRICT ON UPDATE CASCADE;
