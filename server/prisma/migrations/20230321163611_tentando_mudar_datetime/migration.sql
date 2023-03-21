/*
  Warnings:

  - You are about to alter the column `expires_in` on the `recovery_codes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `recovery_codes` MODIFY `expires_in` DATETIME NOT NULL;
