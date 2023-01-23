import { IProduct } from "./../interfaces/productInterface";
import { Request, Response, Router } from "express";
const productController = Router();
import productService from "../services/productService";
import authenticateMiddleware from "../middlewares/authMiddleware";

productController.get(
  "/listar",
  authenticateMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization || "";
    const page: string = req.query.page as string;
    const size: string = req.query.size as string;
    const name: string = req.query.name as string;
    if (!page || !size)
      return res.status(404).json({ message: "Nada encontrado!" });
    else {
      const products = await productService.findAll(
        parseInt(size),
        parseInt(page),
        token,
        name
      );
      return res.status(200).json(products);
    }
  }
);

productController.post(
  "/cadastrar",
  authenticateMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization || "";
    const product: IProduct = req.body;
    await productService.createProduct(product, token);
    return res.status(201).json({ message: "Produto salvo com sucesso!" });
  }
);

productController.delete(
  "/delete/:id",
  authenticateMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization || "";
    const { id } = req.params;
    const removed = await productService.remove(id, token);
    return res.status(202).json({ message: removed });
  }
);

productController.put(
  "/editar/:id",
  authenticateMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization || "";
    const { id } = req.params;
    const product: IProduct = req.body;
    const result = await productService.updateProduct(id, product, token);
    return res.status(202).json({ message: result });
  }
);

export default productController;
