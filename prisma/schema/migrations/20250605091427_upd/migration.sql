/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Answers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Code" ALTER COLUMN "valid_until" SET DEFAULT NOW() + interval '10 minutes';

-- CreateIndex
CREATE UNIQUE INDEX "Answers_userId_key" ON "Answers"("userId");
