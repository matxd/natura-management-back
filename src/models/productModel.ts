import { IProduct } from "./../interfaces/productInterface";
import { connection } from "./connection";
import { ObjectId } from "mongodb";

const productCollection = async () => {
  const db = await connection();
  return db.collection("product");
};

const getAll = async (size: number, page: number) => {
  const db = await productCollection();
  const totalItems = await db.countDocuments();
  const totalPages = totalItems / size - 1;
  const items = await db
    .find()
    .skip(page * size)
    .limit(size)
    .toArray();
  return { totalItems, totalPages, size, page, items };
};

const getById = async (id: string) => {
  const db = await productCollection();
  return await db.findOne({ _id: new ObjectId(id) });
};

const createProduct = async (product: IProduct) => {
  const db = await productCollection();
  return await db.insertOne(product);
};

const remove = async (id: string) => {
  const db = await productCollection();
  const { deletedCount } = await db.deleteOne({ _id: new ObjectId(id) });
  return deletedCount;
};

export default { getAll, getById, createProduct, remove };
