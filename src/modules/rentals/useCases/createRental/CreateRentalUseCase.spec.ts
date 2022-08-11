import dayjs from "dayjs";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });

    const rental = await createRentalUseCase.execute({
      user_id: "1111",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rentalif there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
      user_id: "2222"
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "2222",
        car_id: "test",
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for this user"))
  });

  it("Should not be able to create a new rentalif there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24Hours,
      user_id: "2222"
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "111",
        car_id: "test",
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError("Car is unavailable"))
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "test",
        car_id: "333333",
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError("Invalid return time"))
  });
});