import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
    name: string,
    description: string;
}

/**
 * [] - Definir o tipo de retorno
 * [] - Alterar o retorno de erro
 * [] - Acessar o repositorio
 * [] - Retornar algo
 */
class CreateCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) {}

    execute({name, description }: IRequest):void {
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);
        if (categoryAlreadyExists){
            throw new Error("Category already exists!");
        }
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
