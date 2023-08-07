import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { Users } from "../models/index";
import { generateToken } from "../helpers/index";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });
    const correctPassword = user
      ? await bcryptjs.compare(password, user.password)
      : false;

    if (correctPassword && user) {
      const token = generateToken({ id: user.id });
      return res.json({ status: true, token });
    }
    throw Error;
  } catch {
    res.json({ status: false, message: "login" });
  }
};

export default loginUser;
