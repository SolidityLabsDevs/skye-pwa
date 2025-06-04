-- AlterTable
ALTER TABLE "Audio" ADD COLUMN     "show_for_answers" TEXT[];

-- AlterTable
ALTER TABLE "Code" ALTER COLUMN "valid_until" SET DEFAULT NOW() + interval '10 minutes';

-- CreateTable
CREATE TABLE "Answers" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "question_1" TEXT,
    "question_2" TEXT,
    "question_3" TEXT,
    "question_4" TEXT[],
    "question_5" TEXT,
    "question_6" TEXT,
    "question_7" TEXT,
    "question_8" TEXT,
    "question_9" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answers_id_key" ON "Answers"("id");

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
