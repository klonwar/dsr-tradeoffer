import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';

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
}
