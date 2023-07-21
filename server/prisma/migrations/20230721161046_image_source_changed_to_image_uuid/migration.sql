/*
  Warnings:

  - You are about to drop the column `source` on the `translations` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `translations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `translations` DROP COLUMN `source`,
    ADD COLUMN `imageId` VARCHAR(191) NOT NULL;
