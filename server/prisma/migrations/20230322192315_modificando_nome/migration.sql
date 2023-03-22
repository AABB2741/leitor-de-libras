/*
  Warnings:

  - You are about to drop the column `change_code` on the `recovery_codes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `recovery_codes` DROP COLUMN `change_code`,
    ADD COLUMN `change_secret` VARCHAR(191) NULL;
