/*
  Warnings:

  - You are about to drop the column `permission_granted` on the `recovery_codes` table. All the data in the column will be lost.
  - Added the required column `granted` to the `recovery_codes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recovery_codes` DROP COLUMN `permission_granted`,
    ADD COLUMN `granted` BOOLEAN NOT NULL;
