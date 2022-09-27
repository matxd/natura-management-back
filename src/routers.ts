import { Router } from "express";
import peopleController from "./controllers/peopleController";
import animalController from "./controllers/animalController";
import adoptionController from "./controllers/adoptionController";

const routers = Router();

routers.use("/people", peopleController);
routers.use("/animal", animalController);
routers.use("/adoption", adoptionController);

export default routers;
