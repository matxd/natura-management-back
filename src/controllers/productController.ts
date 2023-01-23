import { IProduct } from "./../interfaces/productInterface";
import { Request, Response, Router } from "express";
const productController = Router();
import productService from "../services/productService";
import authenticateMiddleware from "../middlewares/authMiddleware";

productController.get(
  "/listar",
  authenticateMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const page: string = req.query.page as string;
    const size: string = req.query.size as string;
    const name: string = req.query.name as string;
    if (!page || !size)
      return res.status(404).json({ message: "Nada encontrado!" });
    else {
      console.log(size, page, name);
      const products = await productService.findAll(
        parseInt(size),
        parseInt(page),
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
    const product: IProduct = req.body;
    await productService.createProduct(product);
    return res.status(201).json({ message: "Produto salvo com sucesso!" });
  }
);

productController.delete(
  "/delete/:id",
  authenticateMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const removed = await productService.remove(id);
    return res.status(202).json({ message: removed });
  }
);

productController.put(
  "/editar/:id",
  authenticateMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const product: IProduct = req.body;
    const result = await productService.updateProduct(id, product);
    return res.status(202).json({ message: result });
  }
);

export default productController;
