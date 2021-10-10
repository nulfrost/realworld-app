/*
  Warnings:

  - You are about to drop the column `favorited` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `following` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "favorited";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "following";
