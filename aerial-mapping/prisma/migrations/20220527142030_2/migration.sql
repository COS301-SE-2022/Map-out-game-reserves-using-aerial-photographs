/*
  Warnings:

  - You are about to drop the column `email` on the `Pending_Invites` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invite_email]` on the table `Pending_Invites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invite_email` to the `Pending_Invites` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pending_Invites_email_key";

-- AlterTable
ALTER TABLE "Pending_Invites" DROP COLUMN "email",
ADD COLUMN     "invite_email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pending_Invites_invite_email_key" ON "Pending_Invites"("invite_email");
