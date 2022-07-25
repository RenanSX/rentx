import { Router } from 'express';
import multer from "multer";
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listsCategories/ListCategoriesController';
import { ensureAmdin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAmdin,
    createCategoryController.handle
);
categoriesRoutes.post(
    "/import",
    ensureAuthenticated,
    ensureAmdin,
    upload.single("file"),
    importCategoryController.handle
);
categoriesRoutes.get('/', listCategoriesController.handle);

export { categoriesRoutes };
