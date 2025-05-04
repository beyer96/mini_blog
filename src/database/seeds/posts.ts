import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import Post from "../entities/Post";
import AppUser from "../entities/AppUser";

export default async function seedPosts(dataSource: DataSource) {
  const POSTS_PER_USER_COUNT = 3;

  try {
    console.log("Seeding posts...");
    const users = await AppUser.find();

    await seedPostsForUsers(users)
    console.log("✅");
  } catch (error) {
    console.log("❌")
    console.error(error);
    process.exit();
  }

  async function seedPostsForUsers(users: AppUser[]) {
    const postsRepository = dataSource.getRepository(Post);
    const posts: Post[] = [];

    users.forEach(user => {
      for (let i = 0; i < POSTS_PER_USER_COUNT; i++) {
        faker.seed(i + user.id * (Math.random() * 100));
  
        const post = Post.create({
          title: faker.book.title(),
          content: faker.commerce.productDescription(),
          author: user
        });

        posts.push(post);
      }
    });
    await postsRepository.save(posts);
  }
}
