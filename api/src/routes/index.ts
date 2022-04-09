import { Router } from "express";
import { rutaPrueba } from "../controllers/index";

const routes = Router();

routes.get("/",rutaPrueba);

export default routes;
