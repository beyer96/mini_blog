import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import AppUser from "../entities/AppUser";

export default async function seedUsers(dataSource: DataSource) {
  const SEED_COUNT = 10;

  try {
    console.log("Seeding users...");

    const usersRepository = dataSource.getRepository(AppUser);
    const users: AppUser[] = [];
    const mainTestingUser = AppUser.create({
      username: "test",
      password_hash: "12345678",
      email: "john.doe@express-todo.com"
    });

    users.push(mainTestingUser);

    for (let i = 0; i < SEED_COUNT; i++) {
      faker.seed(i);

      const user = createFakeUser(i);

      users.push(user);
    }

    await usersRepository.save(users);
    console.log("✅");
  } catch (error) {
    console.log("❌")
    console.error(error);
    process.exit();
  }
}

function createFakeUser(index: number): AppUser {
  const username = `testUser-${index}`;
  const password = "12345678";

  return AppUser.create({
    username,
    email: `${username}@mini-blog.com`.toLowerCase(),
    password_hash: password
  });
}
