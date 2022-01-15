/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "reflect-metadata";
import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";
import "./shared/container";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    return res.status(500).json({
        status: "error",
        message: `Internal Server Error - ${err.message}`,
    });
});
app.listen(3333, () => console.log("Running!"));
