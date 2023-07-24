/*
  Warnings:

  - You are about to drop the column `created_at` on the `translations` table. All the data in the column will be lost.
  - You are about to drop the column `image_name` on the `translations` table. All the data in the column will be lost.
  - Added the required column `imageName` to the `translations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `translations` DROP COLUMN `created_at`,
    DROP COLUMN `image_name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `imageName` VARCHAR(191) NOT NULL;
