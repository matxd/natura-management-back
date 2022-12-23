import { Request, Response, Router } from "express";
import authService from "../services/authService";
const authController = Router();

authController.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const authData = req.body;
    const token = await authService.auth(authData);
    return res.status(200).json(token);
  }
);

export default authController;
