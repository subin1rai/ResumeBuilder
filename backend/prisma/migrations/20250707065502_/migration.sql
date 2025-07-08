/*
  Warnings:

  - You are about to drop the column `CompanyName` on the `WorkExperience` table. All the data in the column will be lost.
  - Added the required column `previewUrl` to the `Profileinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profileinfo" ADD COLUMN     "previewUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Resume" ALTER COLUMN "thumbnail" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WorkExperience" DROP COLUMN "CompanyName",
ADD COLUMN     "companyName" TEXT NOT NULL;
