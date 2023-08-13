import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { Users } from "../models/index";

const changePassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (token && typeof token === "string") {
      const user = await Users.findOne({ where: { token } });

      if (user) {
        const passwordHash = await bcryptjs.hash(password, 10);
        user.token = "";
        user.password = passwordHash;
        await user.save();
        return res.json({ status: true });
      }
    }
    throw Error;
  } catch {
    res.json({ status: false });
  }
};

export default changePassword;
