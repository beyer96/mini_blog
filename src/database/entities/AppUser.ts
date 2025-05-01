import bcrypt from "bcrypt";
import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Post from "./Post";

@Entity()
export default class AppUser extends BaseEntity {
  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password_hash, 10);

    console.log(hashedPassword);
    hashedPassword && (this.password_hash = hashedPassword);
  }

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
