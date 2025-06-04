/*
  Warnings:

  - You are about to drop the column `show_for_answers` on the `Audio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Audio" DROP COLUMN "show_for_answers",
ADD COLUMN     "about_your_script" TEXT,
ADD COLUMN     "frequency" TEXT,
ADD COLUMN     "how_it_works" TEXT,
ADD COLUMN     "how_to_listen_for_maximum_effect" TEXT,
ADD COLUMN     "show_for_answers_question_1" TEXT[],
ADD COLUMN     "show_for_answers_question_2" TEXT[],
ADD COLUMN     "show_for_answers_question_3" TEXT[],
ADD COLUMN     "show_for_answers_question_4" TEXT[],
ADD COLUMN     "show_for_answers_question_5" TEXT[],
ADD COLUMN     "show_for_answers_question_6" TEXT[],
ADD COLUMN     "show_for_answers_question_7" TEXT[],
ADD COLUMN     "show_for_answers_question_8" TEXT[],
ADD COLUMN     "show_for_answers_question_9" TEXT[],
ADD COLUMN     "what_you_will_feel" TEXT;

-- AlterTable
ALTER TABLE "Code" ALTER COLUMN "valid_until" SET DEFAULT NOW() + interval '10 minutes';
