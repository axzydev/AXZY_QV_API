-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "neighborhood" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Permission" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Worker" ALTER COLUMN "salary" DROP NOT NULL;
