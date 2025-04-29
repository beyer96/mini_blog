import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  created_at: number;

  @Column()
  updated_at: number;
}
