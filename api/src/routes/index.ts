import { Router } from "express";
import {
  getCity,
  getCityDetails,
  getFavCitys,
  addFavorites,
  deleteFavorites,
  registerUser,
  loginUser,
} from "../controllers/index";
import { validationUser } from "../helpers/validationUser";

const routes = Router();

routes.get("/userFav", validationUser, getFavCitys);
routes.get("/city/:city", getCity);
routes.get("/details", getCityDetails);

routes.post("/saveFavorites", validationUser, addFavorites);
routes.delete("/deleteFavorites", validationUser, deleteFavorites);

routes.post("/registerUser", registerUser);
routes.post("/loginUser", loginUser);

export default routes;
