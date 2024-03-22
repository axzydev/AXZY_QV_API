import { prismaClient } from "../core/config/database";
import { UserCreateDto } from "../core/dto/user.dto";
import { hashPassword } from "../core/utils/security";

export const getAll = async () => {
  try {
    const users = await prismaClient.user.findMany();

    return users;
  } catch (err) {
    throw new Error("Error getting users");
  }
}

export const register = async (user: UserCreateDto) => {
  try {
    const newUser = await prismaClient.user.create({
      data: {
        ...user,
      },
    });

    return newUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateResetToken = async (email: string, token: string) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User not found");

    await prismaClient.user.update({
      where: {
        id: user.id, 
      },
      data: {
        reset_password_token: token
      },
    }); 
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const updatePassword = async (id: number, password: string) => {
  try {
    
    const hashed_password = await hashPassword(password);
  
    await prismaClient.user.update({
      where: {
        id: id, 
      },
      data: {
        password: hashed_password,
        reset_password_token: null
      },
    });

    return true;
  } catch (err) {
    return false
  }
}

export const updateConfirmationToken = async (email: string) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User not found");


    await prismaClient.user.update({
      where: {
        id: user.id, 
      },
      data: {
        confirmed_token: null,
        confirmed_at: new Date()
      },
    }); 
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const confirmation = async (token: string) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        confirmed_token: token,
      },
    });

    if (!user) throw new Error("User not found");

    await prismaClient.user.update({
      where: {
        id: user.id, 
      },
      data: {
        confirmed_token: null,
        confirmed_at: new Date()
      },
    });

    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (err) {
    return false;
  }
}

export const getUserByResetToken = async (token: string) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        reset_password_token: token,
      },
    });

    if (!user) throw new Error("User not found");

    await prismaClient.user.update({
      where: {
        id: user.id, 
      },
      data: {
        reset_password_token: null
      },
    }); 

    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const isUserConfirmed = async (email: string) =>{
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User not found");

    return user.confirmed_at !== null;
  } catch (err) {
    console.log(err);
    throw err;
  }
}