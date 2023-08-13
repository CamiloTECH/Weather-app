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
import { validationUser } from "../helpers/index";

const routes = Router();

routes.get("/userFav", validationUser, getFavCitys);
routes.get("/city/:city", validationUser, getCity);
routes.get("/details", validationUser, getCityDetails);

routes.post("/saveFavorites", validationUser, addFavorites);
routes.delete("/deleteFavorites", validationUser, deleteFavorites);

routes.post("/registerUser", registerUser);
routes.post("/loginUser", loginUser);

routes.post("/validationEmail", validationEmail);
routes.put("/changePassword/:token", changePassword);

export default routes;
