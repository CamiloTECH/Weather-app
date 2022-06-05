import { Request } from "express";
import jwt from "jsonwebtoken";
import { users } from "../models/users";

export const verifyToken = async (req: Request) => {
  try {
    const authorization = req.get("Authorization");

    const token = authorization?.toLowerCase().startsWith("bearer")
      ? authorization.substring(7)
      : "";
    const decodedToken: any = jwt.verify(
      token,
      process.env.SECRET ? process.env.SECRET : ""
    );

    const user = await users.findByPk(decodedToken.id, { attributes: ["id"] });
    return user;
  } catch (error) {
    return "";
  }
};
