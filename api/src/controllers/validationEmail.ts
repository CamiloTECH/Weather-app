import { Request, Response } from "express";
import { Users } from "../models/Users";
import { sendEmail, tokenEmail } from "../helpers/index";

const validationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userExists = await Users.findOne({ where: { email } });
    if (userExists) {
      if (userExists.password.length > 0) {
        userExists.token = tokenEmail();
        await userExists.save();
        await sendEmail(email, userExists.token, userExists.userName);
        return res.json({ status: true });
      }
    }
    throw Error;
  } catch {
    res.json({ status: false, message: "normalEmail" });
  }
};
export default validationEmail;
