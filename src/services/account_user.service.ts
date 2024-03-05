import { prismaClient } from "../core/config/database";
import { AccountUserCreateDto } from "../core/dto/account_user.dto";

export const create = async (account_user: AccountUserCreateDto) => {
    try {
      const newAccountUser = prismaClient.accountUser.create({
        data: {
          ...account_user,
        },
      });
  
      return newAccountUser;
    } catch (err) {
      throw new Error("Error creating account");
    }
  }