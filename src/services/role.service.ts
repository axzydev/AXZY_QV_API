import { prismaClient } from "../core/config/database";

export const getAll = async () => {
  try {
    const roles = prismaClient.role.findMany();

    return roles;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const getRoleBy = async (opts = {}) => {
  try {
    const role = prismaClient.role.findFirst(opts);

    return role;
  } catch (err) {console.log(err);
    throw err;
  }
}