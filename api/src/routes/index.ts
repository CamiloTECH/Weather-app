import { Router } from "express";
import { getCity, getCityDetails, getFavCitys, saveCitys } from "../controllers/index";

const routes = Router();

routes.get("/user/:name",getFavCitys);
routes.get("/city/:name",getCity);
routes.get("/details",getCityDetails);
routes.get("/save",saveCitys);

export default routes;
