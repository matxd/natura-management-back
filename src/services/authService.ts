import { IAuth } from "./../interfaces/authInterface";
import HttpException from "../utils/httpException";
import Token from "../utils/token";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";

const auth = async (authData: IAuth) => {
  const { email, password } = authData;

  if (!email || !password)
    throw new HttpException(401, "E-mail ou senha faltando!");

  const userExist = await userModel.findByEmail(email);

  if (userExist) {
    const result = await bcrypt.compare(password, userExist.password);
    if (!result) throw new HttpException(401, "E-mail ou senha errados!");
  } else {
    throw new HttpException(401, "Usuário não existe!");
  }

  const payload = {
    name: userExist.name,
    email: userExist.email,
    id: userExist._id.toString(),
  };

  const tokenGenerator = new Token();
  const token = tokenGenerator.jwtGenerator(payload);
  return token;
};

export default { auth };
