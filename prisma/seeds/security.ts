import { PrismaClient } from '@prisma/client';

export const securitySeed = async (prisma: PrismaClient) => {
  await roleSeed(prisma);
//   await adminSeed(prisma);
//   await permissionsSeed(prisma);
//   await rolePermissionsSeed(prisma);
};

const roleSeed = async (prisma: PrismaClient) => {
  await prisma.$transaction([
    prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
        description: 'Administrador del sistema'
      },  
    }),
    // prisma.role.upsert({
    //   where: { name: 'operaciones' },
    //   update: {},
    //   create: {
    //     name: 'operaciones',
    //   },
    // }),
    // prisma.role.upsert({
    //   where: { name: 'almacen' },
    //   update: {},
    //   create: {
    //     name: 'almacen',
    //   },
    // }),
  ]);
};

// const adminSeed = async (prisma: PrismaClient) => {
//   const adminRole = await prisma.role.findUnique({
//     where: { name: 'admin' },
//   });

//   if (adminRole) {
//     const adminPassword = await bcrypt.hash('admin12345', 10);

//     await prisma.user.upsert({
//       where: { username: 'admin' },
//       update: {
//         password: adminPassword,
//       },
//       create: {
//         username: 'admin',
//         password: adminPassword,
//         name: 'Admin',
//         roleId: adminRole?.id ?? 1,
//       },
//     });
//   }
// };

// const permissionsSeed = async (prisma: PrismaClient) => {
//   await prisma.$transaction([
//     prisma.permission.createMany({
//       data: [
//         { name: 'user:create' },
//         { name: 'user:read' },
//         { name: 'user:update' },
//         { name: 'user:delete' },
//       ],
//       skipDuplicates: true,
//     }),
//     prisma.permission.createMany({
//       data: [
//         { name: 'invoice:create' },
//         { name: 'invoice:read' },
//         { name: 'invoice:update' },
//         { name: 'invoice:delete' },
//         { name: 'invoice:approve' },
//         { name: 'invoice:assign' },
//         { name: 'invoice:capture' },
//       ],
//       skipDuplicates: true,
//     }),
//     prisma.permission.createMany({
//       data: [
//         { name: 'order:create' },
//         { name: 'order:read' },
//         { name: 'order:update' },
//         { name: 'order:delete' },
//         { name: 'order:approve' },
//         { name: 'order:assign' },
//         { name: 'order:capture' },
//       ],
//       skipDuplicates: true,
//     }),
//     prisma.permission.createMany({
//       data: [
//         { name: 'location:create' },
//         { name: 'location:read' },
//         { name: 'location:update' },
//         { name: 'location:delete' },
//       ],
//       skipDuplicates: true,
//     }),
//     prisma.permission.createMany({
//       data: [
//         { name: 'print:create' },
//         { name: 'print:read' },
//         { name: 'print:update' },
//       ],
//       skipDuplicates: true,
//     }),
//   ]);
// };

// const rolePermissionsSeed = async (prisma: PrismaClient) => {
//   // Clean table before seeding
//   await prisma.rolePermission.deleteMany({});

//   const operationsRole = await prisma.role.findUnique({
//     where: { name: 'operaciones' },
//   });

//   if (operationsRole) {
//     const operationsPermissions = await prisma.permission.findMany({
//       where: {
//         OR: [
//           { name: { contains: 'invoice' } },
//           { name: { contains: 'order' } },
//           { name: { contains: 'location' } },
//           { name: { contains: 'print' } },
//         ],
//       },
//     });

//     await prisma.rolePermission.createMany({
//       data: operationsPermissions.map((permission) => ({
//         roleId: operationsRole.id,
//         permissionId: permission.id,
//       })),
//       skipDuplicates: true,
//     });
//   }

//   const warehouseRole = await prisma.role.findUnique({
//     where: { name: 'almacen' },
//   });

//   if (warehouseRole) {
//     const warehousePermissions = await prisma.permission.findMany({
//       where: {
//         OR: [
//           { name: 'invoice:read' },
//           { name: 'invoice:capture' },
//           { name: 'order:read' },
//           { name: 'order:capture' },
//         ],
//       },
//     });

//     await prisma.rolePermission.createMany({
//       data: warehousePermissions.map((permission) => ({
//         roleId: warehouseRole.id,
//         permissionId: permission.id,
//       })),
//       skipDuplicates: true,
//     });
//   }
// };