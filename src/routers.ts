import { Router } from "express";
import productController from "./controllers/productController";
import authController from "./controllers/authController";
import userController from "./controllers/userController";

const routers = Router();

routers.use("/produtos", productController);
routers.use("/autenticacao", authController);
routers.use("/usuario", userController);

export default routers;
