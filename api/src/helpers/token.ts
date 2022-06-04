import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET } = process.env;

export const generateToken = (info: { id: number }) => {
  const token = jwt.sign(info, SECRET ? SECRET : "", {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
};
