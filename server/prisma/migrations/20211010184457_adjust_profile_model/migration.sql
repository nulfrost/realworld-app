/*
  Warnings:

  - You are about to drop the column `following` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `followerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "following";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
