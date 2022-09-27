import { ResultSetHeader } from "mysql2";
import connection from "./connection";
import IAdoption from "../interfaces/adoptionInterface";
import HttpException from "../utils/httpException";

const getAdoptions = async (): Promise<IAdoption[]> => {
  const [rows] = await connection.execute("SELECT * FROM Adoption");
  return rows as IAdoption[];
};

const create = async (adoption: IAdoption): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    "INSERT INTO Adoption (date, personId, animalId) VALUES (?, ?, ?)",
    [adoption.date, adoption.personId, adoption.animalId]
  );
  return result;
};

const update = async (
  id: number,
  adoption: IAdoption
): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    "UPDATE Adoption SET date = ?, personId = ?, animalId = ? WHERE id = ?",
    [adoption.date, adoption.personId, adoption.animalId, id]
  );
  return result;
};

const remove = async (id: number): Promise<void> => {
  await connection.execute("DELETE FROM Adoption WHERE id = ?", [id]);
};

const validationPerson = async (id: number): Promise<void> => {
  const [row] = await connection.execute(
    "SELECT count(*) as exist FROM People WHERE id = ?",
    [id]
  );
  const result = JSON.parse(JSON.stringify(row));
  if (result[0].exist === 0) {
    throw new HttpException(404, "Person not exists!");
  }
};

const validationAnimal = async (id: number): Promise<void> => {
  const [rowAnimal] = await connection.execute(
    "SELECT count(*) as exist FROM Animal WHERE id = ?",
    [id]
  );
  const resultAnimal = JSON.parse(JSON.stringify(rowAnimal));
  if (resultAnimal[0].exist === 0) {
    throw new HttpException(404, "Animal not exists!");
  }

  const [rowAdoption] = await connection.execute(
    "SELECT count(*) as exist FROM Adoption WHERE animalId = ?",
    [id]
  );
  const resultAdoption = JSON.parse(JSON.stringify(rowAdoption));
  if (resultAdoption[0].exist !== 0) {
    throw new HttpException(404, "Animal already adopted!");
  }
};

export default {
  getAdoptions,
  create,
  update,
  remove,
  validationPerson,
  validationAnimal,
};
