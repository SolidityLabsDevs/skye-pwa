-- AlterTable
ALTER TABLE "Audio" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Code" ALTER COLUMN "valid_until" SET DEFAULT NOW() + interval '10 minutes';

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
