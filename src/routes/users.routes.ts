import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/createUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);

export { userRoutes }