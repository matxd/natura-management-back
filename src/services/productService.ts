import { IProduct } from "./../interfaces/productInterface";
import HttpException from "../utils/httpException";
import productModel from "../models/productModel";
import { decodeToken } from "../utils/functions";

const findAll = async (
  size: number,
  page: number,
  token: string,
  name?: string
) => {
  if (name) name = name.toLowerCase();

  return await productModel.findAll(size, page, decodeToken(token), name);
};

const createProduct = async (product: IProduct, token: string) => {
  product.name = product.name.toLowerCase();
  product.status = true;
  const exist = await productModel.findByName(product.name, decodeToken(token));
  if (exist) throw new HttpException(409, "Produto já existe!");
  else {
    return await productModel.createProduct(product, decodeToken(token));
  }
};

const remove = async (id: string, token: string) => {
  const wasRemoved = await productModel.remove(id, decodeToken(token));
  if (wasRemoved === 0) throw new HttpException(404, "Produto não encontrado!");
  else return "Produto removido com sucesso!";
};

const updateProduct = async (id: string, product: IProduct, token: string) => {
  const idExist = await productModel.findById(id, decodeToken(token));

  if (!idExist) throw new HttpException(404, "Produto não encontrado!");
  const result = await productModel.updateProduct(
    id,
    product,
    decodeToken(token)
  );

  if (result) return "Produto editado com sucesso!";
  else throw new HttpException(404, "Não foi possivel editar o produto!");
};

export default { findAll, createProduct, remove, updateProduct };
