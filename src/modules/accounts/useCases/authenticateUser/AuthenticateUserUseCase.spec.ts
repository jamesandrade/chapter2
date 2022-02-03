import { ICreateUserDTO } from "../../repositories/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });
    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000",
            email: "TEST@test.com",
            password: "test",
            username: "test",
            name: "test",
        };
        await createUserUseCase.execute(user);

        await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
    });
    // it("should not be able to authenticae an noexistent user", () => {});
});
