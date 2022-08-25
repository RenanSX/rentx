import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/authenticateUserUseCase";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/createUserUseCase";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/AppError";

describe("Authenticate User", () => {

  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;
  let dateProvider: DayjsDateProvider;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("shoud be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@teste.com",
      password: "1234",
      name: "User test",
    }
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@teste.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!", 401));
  });

  it("should not be able to authenticate an with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000124",
      email: "user2@teste.com",
      password: "1234",
      name: "User test Error",
    }
    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "4321",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

});