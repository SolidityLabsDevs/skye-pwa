/*
  Warnings:

  - The primary key for the `Answers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_pkey";

-- AlterTable
ALTER TABLE "Code" ALTER COLUMN "valid_until" SET DEFAULT NOW() + interval '10 minutes';
