import { Request, Response } from "express";
import { citys } from "../models/citys";
import { users } from "../models/users";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getFavCitys = async (req: Request, res: Response) => {
  const { name } = req.params;
  const userCitys: AxiosResponse[] = [];

  const responseDb = await users.findOne({
    where: { name },
    attributes: ["name"],
    include: {
      model: citys,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  if (responseDb) {
    for (const city of responseDb.citys) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name.trim()}&appid=${
          process.env.API_KEY
        }&units=metric`
      );
      userCitys.push(response.data);
    }
  }
  res.json(userCitys);
};

export const getCity = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.json({});
  }
};

export const getCityDetails = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&appid=${process.env.API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.json({});
  }
};

export const saveCitys = async (req: Request, res: Response) => {
  res.send("details");
};
