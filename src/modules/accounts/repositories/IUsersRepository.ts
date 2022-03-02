import { User } from "@modules/accounts/entities/User";
import { ICreateUserDTO } from "@modules/accounts/repositories/dtos/ICreateUserDTO";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    updateUserAvatar(id: string, avatar: string): Promise<void>;
}

export { IUsersRepository };
