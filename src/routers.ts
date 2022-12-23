import { Router } from "express";
import productController from "./controllers/productController";
import authController from "./controllers/authController";

const routers = Router();

routers.use("/product", productController);
routers.use("/auth", authController);

export default routers;
