import { connection } from "./connection";
import { ObjectId } from "mongodb";

const userCollection = async () => {
  const db = await connection();
  return db.collection("user");
};

const findByEmail = async (email: string) => {
  const db = await userCollection();
  return db.findOne({ email: email });
};

const deleteUser = async (id: string) => {
  const db = await userCollection();
  const collectionProductUser = await connection();
  collectionProductUser.collection("product" + id).drop();
  const { deletedCount } = await db.deleteOne({ _id: new ObjectId(id) });
  return deletedCount;
};

export default { findByEmail, deleteUser };
