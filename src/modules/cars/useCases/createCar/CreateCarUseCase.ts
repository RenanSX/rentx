import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { AppError } from "@shared/errors/AppError"

@injectable()
class CreateCarUseCase {

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ){}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications
  }: ICreateCarDTO): Promise<Car> {

    const carAlreadyExist = await this.carsRepository.findByLicensePlate(license_plate);

    if (carAlreadyExist) {
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications
    });

    return car
  }
}

export { CreateCarUseCase }