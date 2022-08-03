import dayjs from "dayjs";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1111",
      car_id: "111111",
      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rentalif there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "2222",
        car_id: "test",
        expected_return_date: dayAdd24Hours
      });
      
      await createRentalUseCase.execute({
        user_id: "2222",
        car_id: "test",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it("Should not be able to create a new rentalif there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "test",
        car_id: "333333",
        expected_return_date: dayAdd24Hours
      });
      
      await createRentalUseCase.execute({
        user_id: "test",
        car_id: "333333",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "test",
        car_id: "333333",
        expected_return_date: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError)
  });
});