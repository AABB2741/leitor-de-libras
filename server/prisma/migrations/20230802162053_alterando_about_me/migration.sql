/*
  Warnings:

  - You are about to drop the column `about_me` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `about_me`,
    ADD COLUMN `aboutMe` VARCHAR(191) NULL;
