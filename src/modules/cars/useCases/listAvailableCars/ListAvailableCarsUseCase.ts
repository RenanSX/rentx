import "reflect-metadata";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { injectable, inject } from "tsyringe";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ category_id, name, brand }: IRequest): Promise<Car[]> {
    return this.carsRepository.findAvailable(brand, category_id, name);
  }
}

export { ListAvailableCarsUseCase }