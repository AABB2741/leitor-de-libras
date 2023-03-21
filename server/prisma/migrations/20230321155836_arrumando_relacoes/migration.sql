/*
  Warnings:

  - You are about to drop the column `owner_id` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `recovery_codes` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `recovery_codes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `logs` DROP FOREIGN KEY `logs_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `recovery_codes` DROP FOREIGN KEY `recovery_codes_user_email_fkey`;

-- AlterTable
ALTER TABLE `logs` DROP COLUMN `owner_id`,
    ADD COLUMN `ownerId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `recovery_codes` DROP COLUMN `user_email`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `recovery_codes` ADD CONSTRAINT `recovery_codes_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
