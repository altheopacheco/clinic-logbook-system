/*
  Warnings:

  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearLevel` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "section" TEXT NOT NULL,
ADD COLUMN     "yearLevel" INTEGER NOT NULL;
