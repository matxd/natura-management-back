import IPeople, { IPeopleAuth } from "../interfaces/peopleInterface";
import peopleModel from "../models/peopleModel";
import HttpException from "../utils/httpException";
import Token from "../utils/token";
import { hash, compare } from "bcrypt";

const auth = async (loginData: IPeopleAuth): Promise<string> => {
  const { email, password } = loginData;

  if (!email || !password) throw new HttpException(401, "Missing data!");

  const person = await peopleModel.getByEmail(email);
  if (!person) throw new HttpException(404, "Person no exists!");

  const validatePassword = await compare(password, person.password);
  if (!validatePassword)
    throw new HttpException(401, "E-mail or password incorrect!");

  const payload = {
    name: person.name,
    email: person.email,
    role: person.role,
  };

  const tokenGenerator = new Token();
  const token = tokenGenerator.jwtGenerator(payload);

  return token;
};

const getPeople = async (): Promise<IPeople[]> => {
  return await peopleModel.getPeople();
};

const create = async (person: IPeople): Promise<IPeople> => {
  person.password = (await hash(person.password, 8)).toString();

  const { insertId } = await peopleModel.create(person);
  person.id = insertId;
  return person;
};

const update = async (id: number, person: IPeople): Promise<IPeople> => {
  person.password = (await hash(person.password, 8)).toString();

  await peopleModel.update(Number(id), person);
  person.id = id;
  return person;
};

const remove = async (id: number): Promise<void> => {
  await peopleModel.remove(id);
};

export default { getPeople, create, update, remove, auth };
