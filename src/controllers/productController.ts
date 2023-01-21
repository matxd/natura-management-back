import { IProduct } from "./../interfaces/productInterface";
import { Request, Response, Router } from "express";
const productController = Router();
import productService from "../services/productService";
import authenticateMiddleware from "../middlewares/authMiddleware";

productController.get(
  "/listar",
  async (req: Request, res: Response): Promise<Response> => {
    const page: string = req.query.page as string;
    const size: string = req.query.size as string;
    if (!page || !size)
      return res.status(404).json({ message: "Nada encontrado!" });
    else {
      console.log(size, page);
      const products = await productService.getAll(
        parseInt(size),
        parseInt(page)
      );
      return res.status(200).json(products);
    }
  }
);

productController.get(
  "/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const product = await productService.getById(id);
    return res.status(200).json(product);
  }
);

productController.post(
  "/",
  authenticateMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const product: IProduct = req.body;
    await productService.createProduct(product);
    return res.status(201).json({ message: "Produto salvo com sucesso!" });
  }
);

productController.delete(
  "/:id",
  authenticateMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const removed = await productService.remove(id);
    return res.status(202).json({ message: removed });
  }
);

export default productController;
