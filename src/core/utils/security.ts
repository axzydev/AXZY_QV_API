import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/config';

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const comparePassword = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);

export const generateJWT = (payload: any | {}) =>
  jwt.sign(payload, secretKey, {
    expiresIn: '1d',
  });

export const confirmedToken = (email: string) => 
  jwt.sign({email}, secretKey, {
    expiresIn: '1d',
  });