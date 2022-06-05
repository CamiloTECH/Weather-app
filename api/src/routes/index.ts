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
routes.get("/city/:city", validationUser, getCity);
routes.get("/details", validationUser, getCityDetails);

routes.post("/saveFavorites", validationUser, addFavorites);
routes.delete("/deleteFavorites", validationUser, deleteFavorites);

routes.post("/registerUser", registerUser);
routes.post("/loginUser", loginUser);

export default routes;
