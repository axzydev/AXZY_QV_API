import { PrismaClient } from '@prisma/client';

import { securitySeed } from './seeds/security';
import { deleteSeed } from './seeds/delete';

const prisma = new PrismaClient();

async function main() {
  await securitySeed(prisma);
  await deleteSeed(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });