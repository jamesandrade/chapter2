import { Router, Request, Response } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req: Request, res: Response) => {
  const { name, description } = req.body;

  const categoryAlredyExists = categoriesRepository.findByName(name);

  if (categoryAlredyExists) {
    return res.status(400).json({ error: "Category Already Exists!" }).send();
  }
  categoriesRepository.create({ name, description });
  return res.status(201).send();
});
categoriesRoutes.get("/", (req: Request, res: Response) => {
  const listAll = categoriesRepository.list();
  return res.status(201).json(listAll).send();
});
export { categoriesRoutes };
