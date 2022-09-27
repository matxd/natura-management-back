import { Request, Response, NextFunction } from "express";
import Token from "../utils/token";

const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization || "";
  const tokenGenerator = new Token();
  const payload = await tokenGenerator.authenticateToken(token);

  res.locals.payload = payload;

  next();
};

export default authenticateMiddleware;
