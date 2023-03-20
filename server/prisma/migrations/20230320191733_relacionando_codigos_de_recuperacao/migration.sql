/*
  Warnings:

  - You are about to drop the column `email` on the `recovery_codes` table. All the data in the column will be lost.
  - Added the required column `permission_granted` to the `recovery_codes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `recovery_codes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recovery_codes` DROP COLUMN `email`,
    ADD COLUMN `permission_granted` BOOLEAN NOT NULL,
    ADD COLUMN `user_email` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `recovery_codes` ADD CONSTRAINT `recovery_codes_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
