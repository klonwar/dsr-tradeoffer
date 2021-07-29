import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = `admin`,
  USER = `user`,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({
    type: `enum`,
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
