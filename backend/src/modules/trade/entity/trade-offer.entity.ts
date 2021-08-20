import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemEntity } from '#src/modules/user-items/entity/item.entity';
import { Type } from 'class-transformer';

@Entity({ name: `trade-offer` })
export class TradeOfferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  offered_item_id: number;

  @Column()
  desired_item_id: number;

  // Relations

  // Пусть пользователь для каждой своей вещи может сделать
  // только один трейдоффер. Это позволит избежать спама

  @Type(() => ItemEntity)
  @OneToOne(() => ItemEntity, (item) => item.to_where_offered, {
    onDelete: `CASCADE`,
  })
  @JoinColumn({ name: `offered_item_id` })
  offered_item: ItemEntity;

  @Type(() => ItemEntity)
  @ManyToOne(() => ItemEntity, (item) => item.tos_where_desired, {
    onDelete: `CASCADE`,
  })
  @JoinColumn({ name: `desired_item_id` })
  desired_item: ItemEntity;
}
