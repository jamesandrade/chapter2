import { Router, Request, Response } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req: Request, res: Response) => {
    return createSpecificationController.handle(req, res);
});

specificationsRoutes.get("/", (req: Request, res: Response) => {
    // const listAll = specificationsRepository.list();
    return res.status(201);
});

export { specificationsRoutes };
