import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./verifyToken";

export const validationUser = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const userOrAdmin = await verifyToken(req);
    return userOrAdmin
      ? next()
      : res.status(401).json({ error: "Invalid access" });
  } catch (error) {
    res.status(401).json({ error: "Invalid access" });
  }
};
