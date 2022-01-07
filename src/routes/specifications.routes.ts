import { Router, Request, Response } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (req: Request, res: Response) => {
    const { name, description } = req.body;
    const createSpecificationService = new CreateSpecificationService(
        specificationsRepository
    );
    createSpecificationService.execute({ name, description });
    return res.status(201).send();
});

specificationsRoutes.get("/", (req: Request, res: Response) => {
    const listAll = specificationsRepository.list();
    return res.status(201).json(listAll).send();
});

export { specificationsRoutes };
