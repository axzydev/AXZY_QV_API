import { prismaClient } from "../core/config/database";

export const getAll = async () => {
  try {
    const roles = prismaClient.role.findMany();

    return roles;
  } catch (err) {
    throw new Error("Error getting roles");
  }
}

export const getRoleBy = async (opts = {}) => {
  try {
    const role = prismaClient.role.findFirst(opts);

    return role;
  } catch (err) {
    throw new Error("Error getting role");
  }
}