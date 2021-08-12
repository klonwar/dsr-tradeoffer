import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Profile } from '#src/modules/user/entity/profile.entity';
import { User } from '#src/modules/user/entity/user.entity';
import { ItemEntity } from '#src/modules/items/entity/item.entity';

@Entity({ name: `photo` })
export class PhotoEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(
    ({ value }: { value: string }) => value?.replace(/\\/, `/`) ?? null,
  )
  @Expose({ name: `photoPath` })
  @Column({ type: `text` })
  photo_path: string;

  // Relations
  @OneToMany(() => Profile, (profile) => profile.photo, { onDelete: `CASCADE` })
  profiles: Profile[];

  @ManyToMany(() => ItemEntity, (item) => item.photos, { onDelete: `CASCADE` })
  items: ItemEntity[];
}
