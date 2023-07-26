/*
  Warnings:

  - Added the required column `updatedAt` to the `translations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `translations` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
