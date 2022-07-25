import createConnection from "../index";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      VALUES('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXXX')
    `
  )
}

create().then(() => console.log("User admin created!"));