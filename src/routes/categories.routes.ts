import { Router, Request, Response } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req: Request, res: Response) => {
    return createCategoryController.handle(req, res);
});
categoriesRoutes.get("/", (req: Request, res: Response) => {
    const listAll = categoriesRepository.list();
    return res.status(201).json(listAll).send();
});
export { categoriesRoutes };
