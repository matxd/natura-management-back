import { IProduct } from "./../interfaces/productInterface";
import { connection } from "./connection";
import { ObjectId } from "mongodb";

const productCollection = async () => {
  const db = await connection();
  return db.collection("product");
};

const findAll = async (size: number, page: number, name?: string) => {
  const db = await productCollection();

  const totalItems = await db.countDocuments(name ? { name: name } : {});
  let totalPages = totalItems / size;
  totalPages = totalPages < 1 ? 1 : totalPages;
  const items = await db
    .find(name ? { name: name } : {}, { sort: "name" })
    .skip(page * size)
    .limit(size)
    .toArray();

  return { totalItems, totalPages, size, page, items };
};

const findByName = async (name: string) => {
  const db = await productCollection();
  return await db.findOne({ name: name });
};

const findById = async (id: string) => {
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

const updateProduct = async (id: string, product: IProduct) => {
  const db = await productCollection();

  const result = await db.updateOne(
    { _id: new ObjectId(id) },
    { $set: product }
  );

  return result.modifiedCount;
};

export default {
  findAll,
  findById,
  createProduct,
  remove,
  findByName,
  updateProduct,
};
