-- CreateTable
CREATE TABLE "Pending_Invites" (
    "inviteID" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Pending_Invites_pkey" PRIMARY KEY ("inviteID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pending_Invites_email_key" ON "Pending_Invites"("email");
