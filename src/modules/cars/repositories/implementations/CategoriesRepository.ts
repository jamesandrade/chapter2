import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    public async create({
        description,
        name,
    }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    public async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    public async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });

        return category;
    }
}

export default CategoriesRepository;
