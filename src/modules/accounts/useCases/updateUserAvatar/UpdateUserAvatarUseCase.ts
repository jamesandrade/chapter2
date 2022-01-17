import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    id: string;
    avatar: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({ id, avatar }: IRequest): Promise<void> {
        await this.usersRepository.updateUserAvatar(id, avatar);
    }
}
export { UpdateUserAvatarUseCase };
