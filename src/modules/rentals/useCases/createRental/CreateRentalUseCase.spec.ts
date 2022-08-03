import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1111",
      car_id: "111111",
      expected_return_date: new Date()
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rentalif there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "2222",
        car_id: "test",
        expected_return_date: new Date()
      });
      
      await createRentalUseCase.execute({
        user_id: "2222",
        car_id: "test",
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it("Should not be able to create a new rentalif there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "test",
        car_id: "333333",
        expected_return_date: new Date()
      });
      
      await createRentalUseCase.execute({
        user_id: "test",
        car_id: "333333",
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError)
  });
});