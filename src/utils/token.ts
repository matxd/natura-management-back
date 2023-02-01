import jwt, { SignOptions } from "jsonwebtoken";
import { IToken } from "../interfaces/authInterface";
import HttpException from "./httpException";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.TOKEN_SECRET as string;

const jwtDefaultConfig: SignOptions = {
  expiresIn: "10",
  algorithm: "HS256",
};

class Token {
  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) {
      jwtConfig = jwtDefaultConfig;
    }
  }

  public jwtGenerator(payload: IToken) {
    return jwt.sign(payload, SECRET, { expiresIn: "30m" });
  }

  public async authenticateToken(token: string) {
    if (!token) throw new HttpException(401, "Sem acesso!");

    try {
      const validateJwt = jwt.verify(token, SECRET);
      return { validateJwt };
    } catch (error) {
      throw new HttpException(401, "Acesso inválido ou expirado!");
    }
  }
}

export default Token;
