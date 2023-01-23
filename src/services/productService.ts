import { IProduct } from "./../interfaces/productInterface";
import HttpException from "../utils/httpException";
import productModel from "../models/productModel";

const findAll = async (size: number, page: number, name?: string) => {
  const products = await productModel.findAll(size, page, name);
  return products;
};

const createProduct = async (product: IProduct) => {
  product.name = product.name.toLowerCase();
  const exist = await productModel.findByName(product.name);
  if (exist) throw new HttpException(409, "Produto já existe!");
  else {
    return await productModel.createProduct(product);
  }
};

const remove = async (id: string) => {
  const wasRemoved = await productModel.remove(id);
  if (wasRemoved === 0) throw new HttpException(404, "Produto não encontrado!");
  else return "Produto removido com sucesso!";
};

const updateProduct = async (id: string, product: IProduct) => {
  const idExist = await productModel.findById(id);

  if (!idExist) throw new HttpException(404, "Produto não encontrado!");
  const result = await productModel.updateProduct(id, product);

  if (result) return "Produto editado com sucesso!";
  else throw new HttpException(404, "Não foi possivel editar o produto!");
};

export default { findAll, createProduct, remove, updateProduct };
