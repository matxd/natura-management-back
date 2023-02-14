import { IUser } from "./../interfaces/userInterface";
import { Request, Response, Router } from "express";
const userController = Router();
import userService from "../services/userService";
import authenticateMiddleware from "../middlewares/authMiddleware";
import imageMiddleware from "../middlewares/imageMiddleware";

userController.get(
  "/listar",
  authenticateMiddleware,
  async (_req: Request, res: Response): Promise<Response> => {
    const users = await userService.findAll();
    return res.status(201).json(users);
  }
);

userController.get(
  "/logado",
  authenticateMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization || "";
    const user = await userService.findLogged(token);
    return res.status(201).json(user);
  }
);

userController.post(
  "/cadastrar",
  async (req: Request, res: Response): Promise<Response> => {
    const user: IUser = req.body;
    await userService.createUser(user);
    console.log("oi");
    return res.status(201).json({ message: "Usuário criado!" });
  }
);

userController.put(
  "/atualizar/:id",
  authenticateMiddleware,
  imageMiddleware.single("image"),
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const user: IUser = JSON.parse(req.body.data);
    const image: Express.Multer.File | undefined = req.file;
    if (image) {
      user.image =
        "data:image/png;base64," + new Buffer(image?.buffer).toString("base64");
      const result = await userService.updateUser(id, user);
      return res.status(201).json({ message: result });
    } else {
      const result = await userService.updateUser(id, user);
      return res.status(201).json({ message: result });
    }
  }
);

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
