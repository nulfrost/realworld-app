/*
  Warnings:

  - You are about to drop the column `followerId` on the `User` table. All the data in the column will be lost.
  - Added the required column `following` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_followerId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "following" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "followerId";
