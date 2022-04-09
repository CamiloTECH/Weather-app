import { Request, Response } from "express";

export const rutaPrueba = (req: Request, res: Response) => {
  res.send("Funcionando");
};

