/*
  Warnings:

  - Added the required column `type` to the `translations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `translations` ADD COLUMN `type` ENUM('v', 'i') NOT NULL;
