/*
  Warnings:

  - You are about to drop the column `user_id` on the `logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `logs` DROP COLUMN `user_id`,
    ADD COLUMN `owner_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
