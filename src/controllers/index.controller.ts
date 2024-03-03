import { Request, Response } from "express";
import { index } from "../services/index.service";

export const helloWorld = async (req: Request, res: Response) => {
  const response = await index();
  res.json(response);
};

