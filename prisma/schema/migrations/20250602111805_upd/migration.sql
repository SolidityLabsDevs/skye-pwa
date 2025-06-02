-- AlterTable
ALTER TABLE "Code" ALTER COLUMN "valid_until" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "Storage" ADD COLUMN     "tag" TEXT;

-- CreateTable
CREATE TABLE "Audio" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "audioCoverImageId" TEXT,
    "audioFileId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Audio_id_key" ON "Audio"("id");

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_audioCoverImageId_fkey" FOREIGN KEY ("audioCoverImageId") REFERENCES "Storage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_audioFileId_fkey" FOREIGN KEY ("audioFileId") REFERENCES "Storage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
