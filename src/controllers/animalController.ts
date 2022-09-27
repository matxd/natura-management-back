import { Request, Response, Router } from "express";
const animalController = Router();
import animalService from "../services/animalService";

animalController.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const animals = await animalService.getAnimals();
    return res.status(200).json(animals);
  }
);

animalController.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const animalData = req.body;
    const animal = await animalService.create(animalData);
    return res.status(200).json(animal);
  }
);

animalController.put(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const animalData = req.body;
    const animal = await animalService.update(Number(id), animalData);
    return res.status(200).json(animal);
  }
);

animalController.delete(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await animalService.remove(Number(id));
    return res.status(200).json({ message: "Removido com sucesso!" });
  }
);

export default animalController;
