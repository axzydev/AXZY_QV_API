import { Request, Response } from "express";
import { RegisterDto, UserConfirmDto, UserLoginDto, UserResetPasswordDto } from "../core/dto/user.dto";
import { createTResult } from "../core/mappers/tresult.mapper";
import { UsersEntityToDto } from "../core/mappers/user.mapper";
import { sendConfirmationEmail as sendEmail, sendResetPasswordEmail } from "../core/utils/email_sender"; // Assuming this is refactored out
import { comparePassword, generateJWT, generateToken, hashPassword, verifyToken } from "../core/utils/security";
import { create as CreateAccount } from "../services/account.service";
import { create as CreateAccountUser } from "../services/account_user.service";
import { getRoleBy } from "../services/role.service";
import { register as RegisterUser, confirmation, getAll, getUserByEmail, getUserByResetToken, isUserConfirmed, updateConfirmationToken, updatePassword, updateResetToken } from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAll();
    res.status(200).json(createTResult(UsersEntityToDto(users)));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { account, user } = req.body as RegisterDto;

    const newAccount = await CreateAccount(account);
    user.password = await hashPassword(user.password);
    user.confirmed_token = await generateToken(user.email);

    const newUser = await RegisterUser(user);
    const role = await getRoleBy({ where: { name: 'admin' } });

    if (!role) throw new Error('Role not found');

    await CreateAccountUser({ account_id: newAccount.id, user_id: newUser.id, role_id: role.id });
    await sendConfirmationEmail(user.name, user.email, user.confirmed_token);

    res.status(201).json(createTResult(true));

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as UserLoginDto;

    const user = await getUserByEmail(email);

    if (!user) {
      // If the user doesn't exist, return an error
      return res.status(404).json({ message: 'User not found' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password not found' });
    }

    const isPasswordValid = await comparePassword(password, user.password || '');

    if (!isPasswordValid) {
      // If the password is invalid, return an error
      return res.status(401).json({ message: 'Invalid password' });
    }

    const isConfirmed = await isUserConfirmed(user.email);

    if (!isConfirmed) {
      // If the password is invalid, return an error
      return res.status(401).json({ message: 'User not confirmed' });
    }

    const payload = {
      userId: user.id, // Assuming the user object has an id. Adjust the payload as needed.
      email: user.email, // You could also include other user details in the payload
    };

    const token = await generateJWT(payload);

    // Send the token to the client
    res.status(200).json({ token });

  } catch (err) {
    res.status(500).json({ message: err });
  }
}

export const confirmationUser = async (req: Request, res: Response) => {
  try {

    const token = req.query.token as string;

    if (!token) throw new Error('Token not found');

    await verifyToken(token);

    const userConfirmation = confirmation(token);

    if (!userConfirmation) throw new Error('User not found');


    res.redirect('https://www.facebook.com'); // Adjust this to your index path

  } catch (err) {
    res.redirect('https://www.google.com'); // Adjust this to your index path
  }
}

export const sendUserConfirmationEmail = async (req: Request, res: Response) => {
  try {

    const { email } = req.body as UserConfirmDto;

    const user = await getUserByEmail(email);

    if (!user) 
      return res.status(404).json({ message: 'User not found' });

    if (!user.confirmed_token) 
      return res.status(401).json({ message: 'User confirmed' });    

    user.confirmed_token = await generateToken(email);

    updateConfirmationToken(email);

    await sendConfirmationEmail(user.name, user.email, user.confirmed_token || '');

    res.status(200).json({ message: 'Email sended' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as UserConfirmDto;

    const user = await getUserByEmail(email);

    if (!user) {
      // If the user doesn't exist, return an error
      return res.status(404).json({ message: 'User not found' });
    }

    const token = await generateToken(email);

    if (!token) {
      return res.status(404).json({ message: 'Token not found' });
    }

    updateResetToken(email, token);

    await sendResetPassword(user.name, user.email, token);

    res.status(200).json({ message: 'Email sended' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

export const resetPassword = async (req: Request, res: Response) => {
 try{
    const { token, password } = req.body as UserResetPasswordDto;
  
    const user = await getUserByResetToken(token);
  
    if (!user) {
      // If the user doesn't exist, return an error
      return res.status(404).json({ message: 'User not found' });
    }
  
    const result = await updatePassword(user.id, password);

    if (!result) throw new Error('Error updating password');
    
    res.status(200).json({ message: 'Password updated' });
  
 } catch (err) {
    res.status(500).json({ message: err });
  }
}

// Refactored email sending logic into a separate function or service
async function sendConfirmationEmail(name: string, email: string, confirmed_token: string) {
  await sendEmail(name, email, confirmed_token).catch(err => console.log(err));
}

async function sendResetPassword(name: string, email: string, token: string) {
  await sendResetPasswordEmail(name, email, token).catch(err => console.log(err));
}