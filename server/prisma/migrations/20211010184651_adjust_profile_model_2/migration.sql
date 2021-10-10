-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_followerId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "followerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
