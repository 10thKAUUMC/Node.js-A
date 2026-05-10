-- AlterTable
ALTER TABLE `mission` ADD COLUMN `content` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `point` INTEGER NOT NULL DEFAULT 0;
