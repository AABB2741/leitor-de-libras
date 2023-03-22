-- AlterTable
ALTER TABLE `recovery_codes` ADD COLUMN `change_code` VARCHAR(191) NULL,
    ADD COLUMN `using` BOOLEAN NOT NULL DEFAULT false;
