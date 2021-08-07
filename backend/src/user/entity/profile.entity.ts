import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '#src/user/entity/user.entity';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import * as moment from 'moment';

@Entity()
export class Profile {
  @Exclude()
  @PrimaryColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column({ length: 10 })
  phone: string;

  @Type(() => String)
  @Transform(({ value }) =>
    value ? moment(value).format(`YYYY-MM-DD`) : undefined,
  )
  @Column({ type: `date` })
  birthday: Date;

  @Transform(
    ({ value }: { value: string }) => value?.replace(/\\/, `/`) ?? null,
  )
  @Expose({ name: `photoPath` })
  @Column({ type: `text`, nullable: true })
  photo: string;

  // Relations
  @Exclude()
  @OneToOne(() => User, { primary: true, onDelete: `CASCADE` })
  @JoinColumn({ name: `user_id` })
  user: User;
}
