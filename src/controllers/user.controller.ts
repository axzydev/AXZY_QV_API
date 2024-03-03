import { Request, Response } from "express";
import { create, getAll } from "../services/user.service";
import { createTResult } from "../core/mappers/tresult.mapper";
import { UserEntityToDto, UsersEntityToDto } from "../core/mappers/user.mapper";
import { UserCreateDto, UserDto } from "../core/dto/user.dto";

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

    const user = req.body as UserCreateDto;

    const newUser = await create(user);

    res.status(201).json(createTResult<UserDto>(UserEntityToDto(newUser)));

  } catch (err) {
    res.status(500).json({ message: err });
  }
};
