import { Router } from "express";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAmdin } from "@shared/infra/http/middlewares/ensureAdmin";

const specificationsRoutes = Router();


const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAmdin,
  createSpecificationController.handle
);

export { specificationsRoutes };
