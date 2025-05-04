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
    nullable: true,
    default: "now()"
  })
  published_at: Date;

  @Column({ default: "now()" })
  created_at: Date;

  @Column({ default: "now()" })
  updated_at: Date;

}