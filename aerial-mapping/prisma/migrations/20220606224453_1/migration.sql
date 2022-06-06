-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_password_salt" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_surname" TEXT NOT NULL,
    "user_role" TEXT NOT NULL DEFAULT E'user',
    "user_approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Images" (
    "imageID" SERIAL NOT NULL,
    "collectionID" INTEGER NOT NULL,
    "file_location" VARCHAR(45) NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("imageID")
);

-- CreateTable
CREATE TABLE "Flight_Details" (
    "flightID" SERIAL NOT NULL,
    "flight_height" DOUBLE PRECISION NOT NULL,
    "flight_type" VARCHAR(45) NOT NULL,
    "pilotID" INTEGER NOT NULL,

    CONSTRAINT "Flight_Details_pkey" PRIMARY KEY ("flightID")
);

-- CreateTable
CREATE TABLE "Game_Park" (
    "parkID" SERIAL NOT NULL,
    "park_name" VARCHAR(45) NOT NULL,
    "park_location" VARCHAR(45) NOT NULL,
    "park_address" VARCHAR(45) NOT NULL,

    CONSTRAINT "Game_Park_pkey" PRIMARY KEY ("parkID")
);

-- CreateTable
CREATE TABLE "Image_Collection" (
    "collectionID" SERIAL NOT NULL,
    "parkID" INTEGER NOT NULL,
    "upload_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "flightID" INTEGER NOT NULL,

    CONSTRAINT "Image_Collection_pkey" PRIMARY KEY ("collectionID")
);

-- CreateTable
CREATE TABLE "Message" (
    "messageID" SERIAL NOT NULL,
    "message_status" TEXT NOT NULL,
    "message_description" TEXT NOT NULL,
    "collectionID" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageID")
);

-- CreateTable
CREATE TABLE "Pending_Invites" (
    "inviteID" SERIAL NOT NULL,
    "invite_email" TEXT NOT NULL,

    CONSTRAINT "Pending_Invites_pkey" PRIMARY KEY ("inviteID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Images_imageID_key" ON "Images"("imageID");

-- CreateIndex
CREATE UNIQUE INDEX "Flight_Details_flightID_key" ON "Flight_Details"("flightID");

-- CreateIndex
CREATE UNIQUE INDEX "Pending_Invites_invite_email_key" ON "Pending_Invites"("invite_email");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_collectionID_fkey" FOREIGN KEY ("collectionID") REFERENCES "Image_Collection"("collectionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_Details" ADD CONSTRAINT "Flight_Details_pilotID_fkey" FOREIGN KEY ("pilotID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image_Collection" ADD CONSTRAINT "Image_Collection_flightID_fkey" FOREIGN KEY ("flightID") REFERENCES "Flight_Details"("flightID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image_Collection" ADD CONSTRAINT "Image_Collection_parkID_fkey" FOREIGN KEY ("parkID") REFERENCES "Game_Park"("parkID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_collectionID_fkey" FOREIGN KEY ("collectionID") REFERENCES "Image_Collection"("collectionID") ON DELETE RESTRICT ON UPDATE CASCADE;
