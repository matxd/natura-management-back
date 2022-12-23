import { IProduct } from "./../interfaces/productInterface";
import HttpException from "../utils/httpException";
import productModel from "../models/productModel";

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id: string) => {
  const product = await productModel.getById(id);
  return product;
};

const createProduct = async (product: IProduct) => {
  return await productModel.createProduct(product);
};

const remove = async (id: string) => {
  const wasRemoved = await productModel.remove(id);
  if (wasRemoved === 0) throw new HttpException(404, "Produto não encontrado!");
  else return "Produto removido com sucesso!";
};

export default { getAll, getById, createProduct, remove };
