import axios from "axios";
import { Request, Response } from "express";

const getCity = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
    );

    response.data.fav = false;
    res.json(response.data);
  } catch (error) {
    res.json({});
  }
};

export default getCity;
