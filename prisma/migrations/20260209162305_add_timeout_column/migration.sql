/*
  Warnings:

  - Added the required column `timeOut` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "timeOut" TIMESTAMP(3) NOT NULL;
