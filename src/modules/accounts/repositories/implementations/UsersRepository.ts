import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = getRepository(User);
    }
    async create({
        name,
        username,
        email,
        driver_license,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            username,
            email,
            driver_license,
            password,
        });
        await this.repository.save(user);
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ id });
        return user;
    }
    async updateUserAvatar(avatar: string, id: string): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update(User)
            .set({
                avatar,
            })
            .where({ id })
            .execute();
    }
}

export { UsersRepository };