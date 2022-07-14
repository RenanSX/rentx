import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, "68f2f8ec718fa0edc79def603b9235e492791a2f") as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new AppError("Unauthenticated", 401);
    }

    request.user =  {
      id: userId
    }

    next();
  } catch (error) {
    throw new AppError("Unauthenticated", 401);
  }
}