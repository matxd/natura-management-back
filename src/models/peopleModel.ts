import { ResultSetHeader } from "mysql2";
import connection from "./connection";
import IPeople from "../interfaces/peopleInterface";

const getPeople = async (): Promise<IPeople[]> => {
  const [rows] = await connection.execute("SELECT * FROM People");
  return rows as IPeople[];
};

const create = async (person: IPeople): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    "INSERT INTO people (name, phone, email, role, password) VALUES (?, ?, ?, ?, ?)",
    [person.name, person.phone, person.email, person.role, person.password]
  );
  return result;
};

const update = async (
  id: number,
  person: IPeople
): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    "UPDATE people SET name = ?, phone = ?, email = ?, role = ?, password = ? WHERE id = ?",
    [person.name, person.phone, person.email, person.role, person.password, id]
  );
  return result;
};

const remove = async (id: number): Promise<void> => {
  await connection.execute("DELETE FROM people WHERE id = ?", [id]);
};

const getByEmail = async (email: string): Promise<IPeople> => {
  const [rows] = await connection.execute(
    "SELECT * FROM People WHERE email = ?",
    [email]
  );
  const [person] = rows as IPeople[];
  return person as IPeople;
};

export default { getPeople, create, update, remove, getByEmail };
