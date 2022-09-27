import { Request, Response, Router } from "express";
const peopleController = Router();
import peopleService from "../services/peopleService";
import authMiddleware from "../middlewares/authMiddleware";

peopleController.post(
  "/auth",
  async (req: Request, res: Response): Promise<Response> => {
    const authData = req.body;
    const token = await peopleService.auth(authData);
    return res.status(200).json(token);
  }
);

peopleController.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const people = await peopleService.getPeople();
    return res.status(200).json(people);
  }
);

peopleController.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const personData = req.body;
    const person = await peopleService.create(personData);
    return res.status(200).json(person);
  }
);

peopleController.put(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const personData = req.body;
    const person = await peopleService.update(Number(id), personData);
    return res.status(200).json(person);
  }
);

peopleController.delete(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await peopleService.remove(Number(id));
    return res.status(200).json({ message: "Removido com sucesso!" });
  }
);

export default peopleController;
