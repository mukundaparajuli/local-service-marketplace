/*
  Warnings:

  - You are about to drop the column `Longitude` on the `providerprofile` table. All the data in the column will be lost.
  - You are about to drop the column `acceptsHomeVisist` on the `providerprofile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `chatStatus` ENUM('PENDING', 'ENABLED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `providerprofile` DROP COLUMN `Longitude`,
    DROP COLUMN `acceptsHomeVisist`,
    ADD COLUMN `acceptsHomeVisits` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `longitude` DOUBLE NULL;
