import { Request, Response } from "express";
import { createTResult } from "../core/mappers/tresult.mapper";

export const helloWorld = async (req: Request, res: Response) => {
  res.json(
    createTResult({
      message: "Hello World",
    })
  );
};

