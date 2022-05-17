import { Category } from "../model/Category";

interface ICategoryRepository {
    findByName(name: string): Category;
    list(): Category[];
    create(name:string, description:string): void;
}

// DTO - Data Transfer Object
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

export { ICategoryRepository, ICreateCategoryDTO };
