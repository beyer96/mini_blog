import bcrypt from "bcrypt";
import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Post from "./Post";

@Entity()
export default class AppUser extends BaseEntity {
  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password_hash, 10);

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

  @Column({ default: "now()" })
  created_at: Date;

  @Column({ default: "now()" })
  updated_at: Date;

  @OneToMany(() => Post, post => post.author)
  posts: Post[]
}
