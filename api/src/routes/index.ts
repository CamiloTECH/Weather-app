import { Router } from "express";
import { getCity, getCityDetails, getFavCitys, addFavorites, deleteFavorites, registerUser,
  loginUser 
} from "../controllers/index";

const routes = Router();

routes.get("/userFav",getFavCitys);
routes.get("/city/:city",getCity);
routes.get("/details",getCityDetails);

routes.post("/saveFavorites",addFavorites);
routes.delete("/deleteFavorites",deleteFavorites);

routes.post("/registerUser",registerUser);
routes.post("/loginUser",loginUser);

export default routes;
