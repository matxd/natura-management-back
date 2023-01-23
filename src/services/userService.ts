import HttpException from "../utils/httpException";
import userModel from "../models/userModel";

const deleteUser = async (id: string) => {
  const wasRemoved = await userModel.deleteUser(id);
  if (wasRemoved === 0) throw new HttpException(404, "Usuário não encontrado!");
  return;
};

export default { deleteUser };
