import { Request, Response } from "express";
import { Citys, Users } from "../models/index";
import { verifyToken } from "../helpers/index";

const addFavorites = async (req: Request, res: Response) => {
  try {
    const { ciudad } = req.body;
    const verifyUser = await verifyToken(req);

    if (verifyUser) {
      const user = await Users.findByPk(verifyUser.id);
      const [city, created] = await Citys.findOrCreate({
        where: { name: ciudad.trim() },
      });

      const asociacion = await user?.$add("citys", city.id);
      return res.json({ status: !!asociacion });
    }
    throw Error;
  } catch {
    res.json({ status: false });
  }
};

export default addFavorites;
