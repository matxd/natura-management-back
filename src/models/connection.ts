import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export async function connection() {
  dotenv.config();

  const DB_DATABASE: string = process.env.DB_DATABASE
    ? process.env.DB_DATABASE
    : "";

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_DATABASE);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  return db;
}
