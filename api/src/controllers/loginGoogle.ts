import { Request, Response } from "express";
import { Users } from "../models";
import { generateToken } from "../helpers";

const loginGoogle = async (req: Request, res: Response) => {
  try {
    const { email, userName } = req.body;
    let token = "";
    const user = await Users.findOne({ where: { email } });

    if (user) {
      if (user.password.length === 0) {
        token = generateToken({ id: user.id });
      }
    } else {
      const newUser = await Users.create({
        email,
        userName: userName,
        password: "",
      });
      if (newUser.id) {
        token = generateToken({ id: newUser.id });
      }
    }

    if (token) {
      res.json({ status: true, token });
    } else {
      throw new Error("Usuario existente");
    }
  } catch {
    res.json({ status: false, message: "loginGoogle" });
  }
};

export default loginGoogle;
