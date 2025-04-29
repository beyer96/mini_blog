import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import AppUser from "./AppUser";

@Entity()
export default class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppUser, user => user.posts)
  @JoinColumn({ name: "author_id" })
  author: AppUser;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  content: string;

  @Column({
    nullable: true
  })
  published_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

}