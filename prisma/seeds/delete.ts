import { PrismaClient } from '@prisma/client';

export const deleteSeed = async (prisma: PrismaClient) => {
  await deleteAll(prisma);
//   await adminSeed(prisma);
//   await permissionsSeed(prisma);
//   await rolePermissionsSeed(prisma);
};

const deleteAll = async (prisma: PrismaClient) => {
  await prisma.$transaction([
    
    prisma.accountUser.deleteMany({}),
    prisma.account.deleteMany({}),
    prisma.user.deleteMany({})

  ]);
};
