/*
  Warnings:

  - You are about to drop the column `confirmed_token_expiration` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reset_password_token_expiration` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "confirmed_token_expiration",
DROP COLUMN "reset_password_token_expiration";
