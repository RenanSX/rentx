import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
  ){}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase }