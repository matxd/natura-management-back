import { IUser, IUserPut } from "./../interfaces/userInterface";
import { connection } from "./connection";
import { ObjectId } from "mongodb";

const userCollection = async () => {
  const db = await connection();
  return db.collection("user");
};

const findAll = async () => {
  const db = await userCollection();
  return await db.find().toArray();
};

const findLogged = async (idUser: string) => {
  const db = await userCollection();
  const user = await db.findOne({ _id: new ObjectId(idUser) });
  const result = {
    _id: user?._id,
    name: user?.name,
    image: user?.image,
    email: user?.email,
  };
  return result;
};

const createUser = async (user: IUser) => {
  const db = await userCollection();
  return await db.insertOne(user);
};

const updateUser = async (id: string, user: IUserPut) => {
  const db = await userCollection();
  const result = await db.updateOne({ _id: new ObjectId(id) }, { $set: user });

  return result.modifiedCount;
};

const findByEmail = async (email: string) => {
  const db = await userCollection();
  return db.findOne({ email: email });
};

const deleteUser = async (id: string) => {
  const db = await userCollection();
  const collectionProductUser = await connection();

  let result: any = await collectionProductUser.listCollections().toArray();
  result = result.filter((item: any) => item.name === `product${id}`);
  if (result.length > 0) collectionProductUser.dropCollection("product" + id);
  const { deletedCount } = await db.deleteOne({ _id: new ObjectId(id) });
  return deletedCount;
};

export default {
  findByEmail,
  deleteUser,
  createUser,
  updateUser,
  findAll,
  findLogged,
};
