/*
  Warnings:

  - A unique constraint covering the columns `[bookingId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Made the column `bookingId` on table `conversation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookingId` on table `message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `Conversation_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_bookingId_fkey`;

-- DropIndex
DROP INDEX `Conversation_bookingId_fkey` ON `conversation`;

-- DropIndex
DROP INDEX `Message_bookingId_fkey` ON `message`;

-- AlterTable
ALTER TABLE `conversation` MODIFY `bookingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `message` MODIFY `bookingId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Conversation_bookingId_key` ON `Conversation`(`bookingId`);

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
