import { prismaClient } from "../core/config/database";
import { AccountCreateDto } from "../core/dto/account.dto";

export const create = async (account: AccountCreateDto) => {
  try {
    const newAccount = prismaClient.account.create({
      data: {
        ...account,
      },
    });

    return newAccount;
  } catch (err) {
    console.log(err);
    throw err;
  }
}