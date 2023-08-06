import { Request, Response } from "express";
import { Users } from "../models";
import { generateToken } from "../helpers";
import bcryptjs from "bcryptjs";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });
    const correctPassword = user
      ? await bcryptjs.compare(password, user.password)
      : false;

    if (correctPassword && user) {
      const token = generateToken({ id: user.id });
      res.json({ status: true, token });
    } else {
      throw Error;
    }
  } catch {
    res.json({ status: false, message: "login" });
  }
};

export default loginUser;
