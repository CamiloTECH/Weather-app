import axios from "axios";
import { Request, Response } from "express";

const getCityDetails = async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch {
    res.json({});
  }
};

export default getCityDetails;
