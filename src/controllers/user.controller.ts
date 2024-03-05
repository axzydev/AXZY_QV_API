import { Request, Response } from "express";
import { register as RegisterUser, getAll } from "../services/user.service";
import { create as CreateAccount } from "../services/account.service";
import { create as CreateAccountUser } from "../services/account_user.service";
import { createTResult } from "../core/mappers/tresult.mapper";
import { UsersEntityToDto } from "../core/mappers/user.mapper";
import { RegisterDto, UserCreateDto, UserDto } from "../core/dto/user.dto";
import { confirmedToken, hashPassword } from "../core/utils/security";
import { getRoleBy } from "../services/role.service";
import { transporter } from "../core/config/smtp";
import fs from "fs";
import path from "path";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAll();

    res.status(200).json(createTResult<UserDto[]>(UsersEntityToDto(users)));

  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {

    const { account, user } = req.body as RegisterDto;

    const newAccount = await CreateAccount(account);

    user.password = await hashPassword(user.password);

    const newUser = await RegisterUser(user);

    const role = await getRoleBy({ where: { name: 'admin' } });

    if (!role) {
      throw new Error('Role not found');
    }
    const newAccountUser = await CreateAccountUser({ account_id: newAccount.id, user_id: newUser.id, role_id: role.id });

    const confirmationToken = confirmedToken(newUser.email);
    // Construct an absolute path
    const filePath = path.join(__dirname, '../core/utils/templates/confirmation.html');

    const html = await fs.promises.readFile(filePath, 'utf8');
    const personalizedHtml = html.replace("{{token}}", confirmationToken);
    // Send mail with defined transport object
    await transporter.sendMail({
      from: "araujo@cilabs.io", // sender address
      to: newUser.email, // list of receivers
      subject: "Confirmation Email", // Subject line
      text: `Welcome to the jg`, // plain text body
      html: personalizedHtml // html body
    }).catch(err => {
      console.log(err);
    });

    res.status(201).json(createTResult<Boolean>(true));

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};
