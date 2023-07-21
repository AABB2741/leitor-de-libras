/*
  Warnings:

  - You are about to drop the column `imageId` on the `translations` table. All the data in the column will be lost.
  - Added the required column `image_name` to the `translations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `translations` DROP COLUMN `imageId`,
    ADD COLUMN `image_name` VARCHAR(191) NOT NULL;
