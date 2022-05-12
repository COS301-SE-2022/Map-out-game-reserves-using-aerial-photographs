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
CREATE TABLE "Video" (
    "videoID" SERIAL NOT NULL,
    "filmed_date_time" TIMESTAMP(3) NOT NULL,
    "file_location" VARCHAR(45) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("videoID")
);

-- CreateTable
CREATE TABLE "Images" (
    "imageID" SERIAL NOT NULL,
    "videoID" INTEGER NOT NULL,
    "file_location" VARCHAR(45) NOT NULL,
    "imagescol" VARCHAR(45) NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("imageID")
);

-- CreateTable
CREATE TABLE "Flight_Details" (
    "flightID" SERIAL NOT NULL,
    "flight_height" VARCHAR(45) NOT NULL,
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
CREATE TABLE "Video_Collection" (
    "collectionID" SERIAL NOT NULL,
    "parkID" INTEGER NOT NULL,
    "upload_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_Collection_pkey" PRIMARY KEY ("collectionID")
);

-- CreateTable
CREATE TABLE "Video_In_Collection" (
    "collectionID" INTEGER NOT NULL,
    "videoID" INTEGER NOT NULL,
    "video_order" INTEGER NOT NULL,

    CONSTRAINT "Video_In_Collection_pkey" PRIMARY KEY ("collectionID","videoID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Video_videoID_key" ON "Video"("videoID");

-- CreateIndex
CREATE UNIQUE INDEX "Images_imageID_key" ON "Images"("imageID");

-- CreateIndex
CREATE UNIQUE INDEX "Flight_Details_flightID_key" ON "Flight_Details"("flightID");

-- CreateIndex
CREATE UNIQUE INDEX "Video_In_Collection_collectionID_videoID_video_order_key" ON "Video_In_Collection"("collectionID", "videoID", "video_order");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_videoID_fkey" FOREIGN KEY ("videoID") REFERENCES "Video"("videoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_Details" ADD CONSTRAINT "Flight_Details_pilotID_fkey" FOREIGN KEY ("pilotID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video_Collection" ADD CONSTRAINT "Video_Collection_parkID_fkey" FOREIGN KEY ("parkID") REFERENCES "Game_Park"("parkID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video_In_Collection" ADD CONSTRAINT "Video_In_Collection_videoID_fkey" FOREIGN KEY ("videoID") REFERENCES "Video"("videoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video_In_Collection" ADD CONSTRAINT "Video_In_Collection_collectionID_fkey" FOREIGN KEY ("collectionID") REFERENCES "Video_Collection"("collectionID") ON DELETE RESTRICT ON UPDATE CASCADE;
