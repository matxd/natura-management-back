import { Router } from "express";
import productController from "./controllers/productController";
import authController from "./controllers/authController";

const routers = Router();

routers.use("/produtos", productController);
routers.use("/autenticacao", authController);

export default routers;
