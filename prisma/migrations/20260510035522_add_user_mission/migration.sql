/*
  Warnings:

  - You are about to drop the column `content` on the `mission` table. All the data in the column will be lost.
  - Added the required column `description` to the `mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `point` to the `mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `mission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mission` DROP COLUMN `content`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `point` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
