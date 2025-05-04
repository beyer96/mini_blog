import { AppDataSource } from "..";
import seedPosts from "./posts";
import seedUsers from "./users";


async function seed() {
  if (process.env.NODE_ENV === "production") {
    console.log("Do not seed in production!");
    return;
  }

  try {
    const dataSource = await AppDataSource.initialize();
    
    console.log("Dropping current database...");
    await dataSource.dropDatabase();
    console.log("Synchronizing database...");
    await dataSource.synchronize();

    await seedUsers(dataSource);
    await seedPosts(dataSource);

    await dataSource.destroy();
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

seed();
