import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Post from "./Post";

@Entity()
export default class AppUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password_hash: string;

  @Column()
  email: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => Post, post => post.author)
  posts: Post[]
}
