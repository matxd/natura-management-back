import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/httpException";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message } = error as HttpException;
  res.status(status || 500).json({ message });
};

export default errorMiddleware;
