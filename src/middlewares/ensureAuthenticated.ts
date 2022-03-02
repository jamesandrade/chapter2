import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token missing!", 401);
    }

    // [0] = bearer [1] = token
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "88181fb72ce6bcaea828f57b3db3df19"
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const isUser = usersRepository.findById(user_id);
        if (!isUser) {
            throw new AppError("User does not Exist!", 401);
        }
        req.user = {
            id: user_id,
        };
        next();
    } catch {
        throw new AppError("Invalid Token", 401);
    }
}
