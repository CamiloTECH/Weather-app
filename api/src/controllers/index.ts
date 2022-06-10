import { Request, Response } from "express";
import { Citys } from "../models/Citys";
import { Users } from "../models/Users";
import axios, { AxiosResponse } from "axios";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { generateToken } from "../helpers/token";
import { verifyToken } from "../helpers/verifyToken";
import { sendEmail } from "../helpers/sendMail";
import tokenEmail from "../helpers/tokenEmail";

dotenv.config();

export const getFavCitys = async (req: Request, res: Response) => {
  const userCitys: AxiosResponse[] = [];
  const verifyUser = await verifyToken(req);
  try {
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
  } catch (error) {
    res.json([]);
  }
};

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

export const addFavorites = async (req: Request, res: Response) => {
  interface Body {
    ciudad: string;
  }
  const { ciudad } = req.body as Body;
  const verifyUser = await verifyToken(req);

  if (verifyUser) {
    const user = await Users.findByPk(verifyUser.id);
    const [city, created] = await Citys.findOrCreate({
      where: { name: ciudad.trim() },
    });

    const asociacion = await user?.$add("citys", city.id);
    asociacion ? res.json({ status: true }) : res.json({ status: false });
  } else res.json({ status: false });
};

export const deleteFavorites = async (req: Request, res: Response) => {
  interface Body {
    ciudad: string;
  }
  const { ciudad } = req.body as Body;
  const verifyUser = await verifyToken(req);

  if (verifyUser) {
    const user = await Users.findByPk(verifyUser.id);
    const city = await Citys.findOne({
      where: { name: ciudad.trim() },
    });

    if (user && city) {
      const remover = await user.$remove("citys", city.id);
      remover == 1 ? res.json({ status: true }) : res.json({ status: false });
    } else res.json({ status: false });
  } else res.json({ status: false });
};

export const registerUser = async (req: Request, res: Response) => {
  interface Body {
    userName: string;
    email: string;
    password: string;
  }
  const { userName, password, email } = req.body as Body;
  const passwordHast = await bcryptjs.hash(password, 10);
  const [newUser, created] = await Users.findOrCreate({
    where: { email },
    defaults: {
      email,
      userName,
      password: passwordHast,
    },
  });
  res.json({ status: created });
};

export const loginUser = async (req: Request, res: Response) => {
  interface Body {
    email: string;
    password: string;
  }
  const { email, password } = req.body as Body;

  const user = await Users.findOne({ where: { email } });
  const correctPassword = user
    ? await bcryptjs.compare(password, user.password)
    : false;

  if (correctPassword && user) {
    const token = generateToken({ id: user.id });
    res.json({ status: true, token });
  } else res.json({ status: false, message: "login" });
};

export const loginGoogle = async (req: Request, res: Response) => {
  const { email, userName } = req.body;
  let token: string = "";
  try {
    const user = await Users.findOne({ where: { email } });
    if (user) {
      if (user.password.length === 0) {
        token = generateToken({ id: user.id });
      } else {
        throw new Error("Usuario existente");
      }
    } else {
      const newUser = await Users.create({
        email,
        userName: userName,
        password: "",
      });
      token = generateToken({ id: newUser.id });
    }
    res.json({ status: true, token });
  } catch (error) {
    res.json({ status: false, message: "loginGoogle" });
  }
};

export const validationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const userExists = await Users.findOne({ where: { email } });
    if (userExists) {
      if (userExists.password.length > 0) {
        userExists.token = tokenEmail();
        await userExists.save();
        await sendEmail(email, userExists.token, userExists.userName);
        res.json({ status: true });
        
      } else res.json({ status: false, message: "googleEmail" });

    } else res.json({ status: false, message: "normalEmail" });
  } catch (error) {
    res.json({ status: false, message: "normalEmail" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (token && typeof token === "string") {
      const user = await Users.findOne({ where: { token } });
      if (user) {
        const saltRounds = 10;
        const passwordHash = await bcryptjs.hash(password, saltRounds);

        user.token = "";
        user.password = passwordHash;
        await user.save();

        res.json({ status: true });
      } else res.json({ status: false });
    } else res.json({ status: false });
  } catch (error) {
    res.json({ status: false });
  }
};