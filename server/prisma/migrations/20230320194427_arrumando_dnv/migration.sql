/*
  Warnings:

  - You are about to drop the column `granted` on the `recovery_codes` table. All the data in the column will be lost.
  - Added the required column `sent` to the `recovery_codes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recovery_codes` DROP COLUMN `granted`,
    ADD COLUMN `sent` BOOLEAN NOT NULL;
