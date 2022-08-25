import request from "supertest";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

let connection: Connection;
describe("Create Category Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        VALUES('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXXX')
      `);
  });

  afterAll( async() => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category", async () => {
    const reponseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    const response = await request(app)
    .post("/categories")
    .set({
      Authorization: `Bearer ${reponseToken.body.refresh_token}`
    })
    .send({
      name: "category super test",
      description: "Categoria de carros SUV - SUPER TEST"
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new category with name exists", async () => {
    const reponseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });

    const response = await request(app)
    .post("/categories")
    .set({
      Authorization: `Bearer ${reponseToken.body.refresh_token}`
    })
    .send({
      name: "category super test",
      description: "Categoria de carros SUV - SUPER TEST"
    });

    expect(response.status).toBe(400);
  });
});