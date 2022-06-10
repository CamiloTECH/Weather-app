import jwt from "jsonwebtoken";

export const generateToken = (info: { id: number }) => {
  const token = jwt.sign(info, process.env.SECRET ? process.env.SECRET : "", {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
};
