import { User } from "../entities/User";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    updateUserAvatar(id: string, avatar: string): Promise<void>;
}

export { IUsersRepository };
