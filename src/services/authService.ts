import { IAuth } from "./../interfaces/authInterface";
import HttpException from "../utils/httpException";
import Token from "../utils/token";

const auth = async (authData: IAuth) => {
  const { email, password } = authData;

  if (!email || !password)
    throw new HttpException(401, "E-mail ou senha faltando!");

  if (password !== "senhaTemporaria" || email !== "YuriAdmin@gmail.com")
    throw new HttpException(401, "E-mail ou senha errados!");

  const payload = {
    name: "Yuri Admin",
    email: "YuriAdmin@gmail.com",
    role: "ROLE_ADMIN",
  };

  const tokenGenerator = new Token();
  const token = tokenGenerator.jwtGenerator(payload);
  return {
    token,
    payload,
  };
};

export default { auth };
