import { Request, Response } from "express";
import { Users } from "../models";
import bcryptjs from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { userName, password, email } = req.body;
    const passwordHast = await bcryptjs.hash(password, 10);
    const [newUser, created] = await Users.findOrCreate({
      where: { email },
      defaults: {
        email,
        userName,
        password: passwordHast,
      },
    });
    res.json({ status: created });
  } catch {
    res.json({ status: false });
  }
};

export default registerUser;
