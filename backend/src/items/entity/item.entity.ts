import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhotoEntity } from '#src/photos/entity/photo.entity';
import { CategoryEntity } from '#src/items/entity/category.entity';
import { Type } from 'class-transformer';
import { User } from '#src/user/entity/user.entity';

@Entity({ name: `item` })
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: `text` })
  description: string;

  @Column()
  geo: string;

  @Column()
  item_category_id: number;

  @Column()
  trade_category_id: number;

  @Column()
  user_id: number;

  // Relations
  @Type(() => PhotoEntity)
  @ManyToMany(() => PhotoEntity, { cascade: true })
  @JoinTable({
    name: `items_to_photos`,
    joinColumn: { name: `item_id` },
    inverseJoinColumn: { name: `photo_id` },
  })
  photos: PhotoEntity[];

  @Type(() => CategoryEntity)
  @ManyToOne(() => CategoryEntity, null, { cascade: true })
  @JoinColumn({ name: `item_category_id` })
  item_category: CategoryEntity;

  @Type(() => CategoryEntity)
  @ManyToOne(() => CategoryEntity, null, { cascade: true })
  @JoinColumn({ name: `trade_category_id` })
  trade_category: CategoryEntity;

  @ManyToOne(() => User, null, { cascade: true })
  @JoinColumn({ name: `user_id` })
  user: User;
}
