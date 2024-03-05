import { prismaClient } from "../core/config/database";
import { UserCreateDto } from "../core/dto/user.dto";

export const getAll = async () => {
  try {
    const users = prismaClient.user.findMany();

    return users;
  } catch (err) {
    throw new Error("Error getting users");
  }
}

export const register = async (user: UserCreateDto) => {
  try {
    const newUser = prismaClient.user.create({
      data: {
        ...user,
      },
    });

    return newUser;
  } catch (err) {
    throw new Error("Error creating user");
  }
};
