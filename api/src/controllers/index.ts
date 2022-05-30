import { Request, Response } from "express";
import { citys } from "../models/citys";
import { users } from "../models/users";
import axios, { AxiosResponse } from "axios";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import {generateToken} from "../helpers/token"

dotenv.config();

//Retorna todas las ciudades que el usuario añadio como favoritas, retorna un arreglo con toda la info
//del clima de las ciudades
export const getFavCitys = async (req: Request, res: Response) => {
  const { name } = req.params;
  const userCitys: AxiosResponse[] = [];

  const responseDb = await users.findOne({
    where: { userName: name },
    attributes: ["name"],
    include: {
      model: citys,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  try {
    if (responseDb) {
      for (const city of responseDb.citys) {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name.trim()}&appid=${
            process.env.API_KEY
          }&units=metric`
        );
        response.data.fav = true;
        userCitys.push(response.data);
      }
    }
    res.json(userCitys);
  } catch (error) {
    res.json([]);
  }
};

//Optiene la informacion de una ciudad en especifico
export const getCity = async (req: Request, res: Response) => {
  const { city } = req.params;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
    );
    response.data.fav = false;
    res.json(response.data);
  } catch (error) {
    res.json({});
  }
};

//Optiene informacion mas detallada de una ciudad, para saber el clima por horas
export const getCityDetails = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.json({});
  }
};

//Añadir a la DB la ciudad que el usuario quiera añadir a favoritos, para que pueda ser mostrada luego
export const addFavorites = async (req: Request, res: Response) => {
  interface Body {
    id: number;
    ciudad: string;
  }
  const { id, ciudad } = req.body as Body;

  const user = await users.findByPk(id);
  const [city, created] = await citys.findOrCreate({
    where: { name: ciudad.trim() },
  });

  const asociacion = await user?.$add("citys", city.id);
  if (asociacion) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
};

//Eliminar de la DB una ciudad que el usuario ya no quiera tener en favoritos
export const deleteFavorites = async (req: Request, res: Response) => {
  interface Body {
    id: string;
    ciudad: string;
  }
  const { id, ciudad } = req.body as Body;

  const user = await users.findByPk(id);
  const city = await citys.findOne({
    where: { name: ciudad.trim() },
  });

  if (user && city) {
    const remover = await user.$remove("citys", city.id);
    remover == 1 ? res.json({ status: true }) : res.json({ status: false });
  } else {
    res.json({ status: false });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  interface Body {
    userName: string;
    email: string;
    password: string;
  }
  const { userName, password, email } = req.body as Body;
  const passwordHast = await bcryptjs.hash(password, 10);
  const [newUser, created] = await users.findOrCreate({
    where: { userName, email, password: passwordHast },
  });
  res.json({status: created,});
};

export const loginUser = async (req: Request, res: Response) => {
  interface Body {
    email: string;
    password:string
  }
  const { email,password } = req.body as Body;

  const user = await users.findOne({ where: { email } });
  const correctPassword=user ? await bcryptjs.compare(password,user.password):false

  if (correctPassword) {
    const token=generateToken({id:user?.id})
    res.json({status: true,token});
  } else {
    res.json({status: false});
  }
};

/*
Hacer la autenticacion
*/
