import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import AppUser from "./AppUser";
import slugify from "slugify";

@Entity()
export default class Post extends BaseEntity {
  @BeforeInsert()
  generateSlug = () => {
    this.slug = slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g });
  };

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