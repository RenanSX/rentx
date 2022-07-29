import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("shoudl be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Mitsubishi Lancer",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "AZX-1154",
      fine_amount: 50,
      brand: "Mitsubishi",
      category_id: "b9878f2a-45a0-448c-9c16-ba12b0459103"
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Mitsubishi Lancer",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "AZX-1154",
      fine_amount: 50,
      brand: "Mitsubishi",
      category_id: "b9878f2a-45a0-448c-9c16-ba12b0459103"
  })
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Mitsubishi"
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Mitsubishi Lancer",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "AZX-1154",
      fine_amount: 50,
      brand: "Mitsubishi",
      category_id: "b9878f2a-45a0-448c-9c16-ba12b0459103"
  })
    const cars = await listAvailableCarsUseCase.execute({
      name: "Mitsubishi Lancer"
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Mitsubishi Lancer",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "AZX-1154",
      fine_amount: 50,
      brand: "Mitsubishi",
      category_id: "b9878f2a-45a0-448c-9c16-ba12b0459103"
  })
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "b9878f2a-45a0-448c-9c16-ba12b0459103"
    });
    expect(cars).toEqual([car]);
  });


});