import bcrypt from "bcrypt";
import { IUser, IUserPut } from "./../interfaces/userInterface";
import HttpException from "../utils/httpException";
import userModel from "../models/userModel";

const findAll = async () => {
  return await userModel.findAll();
};

const createUser = async (user: IUser) => {
  user.password = await bcrypt.hash(user.password, 10);
  const emailAlreadyExists = await userModel.findByEmail(user.email);
  if (emailAlreadyExists) throw new HttpException(404, "E-mail já é usado!");
  return await userModel.createUser(user);
};

const updateUser = async (id: string, user: IUserPut) => {
  const result = await userModel.updateUser(id, user);
  if (result) return "Usuário editado!";
  else throw new HttpException(404, "Não foi possivel editar o usuário!");
};

const deleteUser = async (id: string) => {
  const wasRemoved = await userModel.deleteUser(id);
  if (wasRemoved === 0) throw new HttpException(404, "Usuário não encontrado!");
  return;
};

export default { deleteUser, createUser, updateUser, findAll };
