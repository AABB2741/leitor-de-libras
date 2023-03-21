/*
  Warnings:

  - You are about to alter the column `code` on the `recovery_codes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(6)`.

*/
-- AlterTable
ALTER TABLE `recovery_codes` MODIFY `code` VARCHAR(6) NOT NULL;
