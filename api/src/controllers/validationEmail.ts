import { Request, Response } from "express";
import { Users } from "../models";
import { sendEmail, tokenEmail } from "../helpers";

const validationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userExists = await Users.findOne({ where: { email } });
    if (userExists) {
      if (userExists.password.length > 0) {
        userExists.token = tokenEmail();
        await userExists.save();
        await sendEmail(email, userExists.token, userExists.userName);
        res.json({ status: true });
      } else {
        res.json({ status: false, message: "googleEmail" });
      }
    } else {
      throw Error;
    }
  } catch {
    res.json({ status: false, message: "normalEmail" });
  }
};
export default validationEmail;
