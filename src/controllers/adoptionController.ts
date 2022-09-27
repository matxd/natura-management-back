import { Request, Response, Router } from "express";
const adoptionController = Router();
import adoptionService from "../services/adoptionService";

adoptionController.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const adoptions = await adoptionService.getAdoptions();
    return res.status(200).json(adoptions);
  }
);

adoptionController.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const adoptionData = req.body;
    const adoption = await adoptionService.create(adoptionData);
    return res.status(200).json(adoption);
  }
);

adoptionController.put(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const adoptionData = req.body;
    const adoption = await adoptionService.update(Number(id), adoptionData);
    return res.status(200).json(adoption);
  }
);

adoptionController.delete(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await adoptionService.remove(Number(id));
    return res.status(200).json({ message: "Removido com sucesso!" });
  }
);

export default adoptionController;
