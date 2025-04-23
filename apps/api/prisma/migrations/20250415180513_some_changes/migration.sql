/*
  Warnings:

  - You are about to drop the column `userId` on the `serviceoffering` table. All the data in the column will be lost.
  - Added the required column `providerProfileId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerProfileId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookingId` on table `review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropForeignKey
ALTER TABLE `serviceoffering` DROP FOREIGN KEY `ServiceOffering_userId_fkey`;

-- DropIndex
DROP INDEX `Review_userId_fkey` ON `review`;

-- DropIndex
DROP INDEX `ServiceOffering_userId_fkey` ON `serviceoffering`;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `providerProfileId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `review` ADD COLUMN `providerProfileId` INTEGER NOT NULL,
    MODIFY `userId` INTEGER NOT NULL,
    MODIFY `bookingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `serviceoffering` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_providerProfileId_fkey` FOREIGN KEY (`providerProfileId`) REFERENCES `ProviderProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_providerProfileId_fkey` FOREIGN KEY (`providerProfileId`) REFERENCES `ProviderProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
