import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { Citys, Users } from "../models/index";
import { verifyToken } from "../helpers/index";

const getFavCitys = async (req: Request, res: Response) => {
  try {
    const userCitys: AxiosResponse[] = [];
    const verifyUser = await verifyToken(req);

    if (verifyUser) {
      const user = await Users.findByPk(verifyUser.id, {
        attributes: [],
        include: {
          model: Citys,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      if (user) {
        for (const city of user.citys) {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.name.trim()}&appid=${
              process.env.API_KEY
            }&units=metric`
          );
          response.data.fav = true;
          userCitys.push(response.data);
        }
      }
    }
    res.json(userCitys);
  } catch {
    res.json([]);
  }
};

export default getFavCitys;
