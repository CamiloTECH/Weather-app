import { Router } from "express";
import {
  getCity,
  getCityDetails,
  getFavCitys,
  addFavorites,
  deleteFavorites,
  registerUser,
  loginUser,
  validationEmail,
  changePassword,
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

routes.post("/validationEmail", validationEmail);
routes.post("/changePassword/:token", changePassword);

export default routes;
