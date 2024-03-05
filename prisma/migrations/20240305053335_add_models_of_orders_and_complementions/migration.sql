/*
  Warnings:

  - You are about to drop the column `user_id` on the `OrderInvitation` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `OrderInvitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `worker_id` to the `OrderInvitation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `owner` on the `OrderInvitation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('car');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('String', 'Number', 'Date', 'Time', 'DateTime', 'Boolean');

-- CreateEnum
CREATE TYPE "ToolType" AS ENUM ('Tool', 'Material');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Open', 'InProgress', 'Done');

-- DropForeignKey
ALTER TABLE "OrderInvitation" DROP CONSTRAINT "OrderInvitation_user_id_fkey";

-- AlterTable
ALTER TABLE "OrderInvitation" DROP COLUMN "user_id",
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD COLUMN     "worker_id" INTEGER NOT NULL,
DROP COLUMN "owner",
ADD COLUMN     "owner" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "salary" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "car_type" "CarType" NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "field_type" "FieldType" NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceField" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "service_id" INTEGER NOT NULL,
    "field_id" INTEGER NOT NULL,

    CONSTRAINT "ServiceField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "tool_type" "ToolType" NOT NULL,
    "description" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "total" DOUBLE PRECISION NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "estimated_completation_at" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "account_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "car_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderService" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "price" DOUBLE PRECISION NOT NULL,
    "order_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "OrderService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderEvidence" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order_id" INTEGER NOT NULL,
    "file" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "OrderEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "text" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceFieldResponse" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "response" TEXT NOT NULL,
    "serviceField_id" INTEGER NOT NULL,
    "orderService_id" INTEGER NOT NULL,

    CONSTRAINT "ServiceFieldResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_uuid_key" ON "Worker"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Car_uuid_key" ON "Car"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Field_uuid_key" ON "Field"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Service_uuid_key" ON "Service"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceField_uuid_key" ON "ServiceField"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_uuid_key" ON "Tool"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Order_uuid_key" ON "Order"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "OrderService_uuid_key" ON "OrderService"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "OrderEvidence_uuid_key" ON "OrderEvidence"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Review_uuid_key" ON "Review"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceFieldResponse_uuid_key" ON "ServiceFieldResponse"("uuid");

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceField" ADD CONSTRAINT "ServiceField_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceField" ADD CONSTRAINT "ServiceField_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderService" ADD CONSTRAINT "OrderService_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderService" ADD CONSTRAINT "OrderService_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderInvitation" ADD CONSTRAINT "OrderInvitation_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderInvitation" ADD CONSTRAINT "OrderInvitation_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderEvidence" ADD CONSTRAINT "OrderEvidence_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceFieldResponse" ADD CONSTRAINT "ServiceFieldResponse_serviceField_id_fkey" FOREIGN KEY ("serviceField_id") REFERENCES "ServiceField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceFieldResponse" ADD CONSTRAINT "ServiceFieldResponse_orderService_id_fkey" FOREIGN KEY ("orderService_id") REFERENCES "OrderService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
