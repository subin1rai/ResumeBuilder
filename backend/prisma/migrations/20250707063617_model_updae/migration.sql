/*
  Warnings:

  - You are about to drop the column `Description` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `WorkExperience` table. All the data in the column will be lost.
  - Added the required column `description` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Profileinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profileinfo" ADD COLUMN     "website" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
