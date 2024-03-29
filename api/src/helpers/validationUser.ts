import { Request, Response, NextFunction } from "express";
import verifyToken from "./verifyToken";

const validationUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userOrAdmin = await verifyToken(req);
    return userOrAdmin
      ? next()
      : res.status(401).json({ error: "Invalid access" });
  } catch {
    res.status(401).json({ error: "Invalid access" });
  }
};

export default validationUser;
