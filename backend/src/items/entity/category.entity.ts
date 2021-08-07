import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: `category` })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
