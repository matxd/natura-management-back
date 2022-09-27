import { ResultSetHeader } from "mysql2";
import connection from "./connection";
import IAnimal from "../interfaces/animalInterface";

const getAnimals = async (): Promise<IAnimal[]> => {
  const [rows] = await connection.execute("SELECT * FROM Animal");
  return rows as IAnimal[];
};

const create = async (animal: IAnimal): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    "INSERT INTO Animal (species, breed, years, color, size) VALUES (?, ?, ?, ?, ?)",
    [animal.species, animal.breed, animal.years, animal.color, animal.size]
  );
  return result;
};

const update = async (
  id: number,
  animal: IAnimal
): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    "UPDATE Animal SET species = ?, breed = ?, years = ?, color = ?, size = ? WHERE id = ?",
    [animal.species, animal.breed, animal.years, animal.color, animal.size, id]
  );
  return result;
};

const remove = async (id: number): Promise<void> => {
  await connection.execute("DELETE FROM Animal WHERE id = ?", [id]);
};

export default { getAnimals, create, update, remove };
