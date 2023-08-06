import { Request, Response } from "express";
import { verifyToken } from "../helpers";
import { Citys, Users } from "../models";

export const deleteFavorites = async (req: Request, res: Response) => {
  try {
    const { ciudad } = req.body;
    const verifyUser = await verifyToken(req);

    if (verifyUser) {
      const user = await Users.findByPk(verifyUser.id);
      const city = await Citys.findOne({
        where: { name: ciudad.trim() },
      });

      if (user && city) {
        const remover = await user.$remove("citys", city.id);
        return res.json({ status: remover == 1 });
      }
    }
    throw Error;
  } catch {
    res.json({ status: false });
  }
};

export default deleteFavorites;
