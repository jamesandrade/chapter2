import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });
    it("should be able to create a new category", async () => {
        const category = {
            name: "test",
            description: "test",
        };
        await createCategoryUseCase.execute({
            name: "test",
            description: "test",
        });
        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );
        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with name exists", async () => {
        expect(async () => {
            await createCategoryUseCase.execute({
                name: "test",
                description: "test",
            });
            await createCategoryUseCase.execute({
                name: "test",
                description: "test",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
