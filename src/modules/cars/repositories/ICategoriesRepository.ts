import { Category } from "../entities/Category";

interface ICategoryRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

// DTO - Data Transfer Object
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

export { ICategoryRepository, ICreateCategoryDTO };
