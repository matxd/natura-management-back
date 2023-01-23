import { Request, Response, Router } from "express";
const userController = Router();
import userService from "../services/userService";
import authenticateMiddleware from "../middlewares/authMiddleware";

userController.delete(
  "/delete/:id",
  authenticateMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await userService.deleteUser(id);
    return res.status(200).json({ message: "Usuário excluido!" });
  }
);

export default userController;
