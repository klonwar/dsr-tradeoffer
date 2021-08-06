import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '#src/user/entity/user.entity';
import { Exclude, Expose } from 'class-transformer';

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

  @Column({ type: `date` })
  birthday: Date;

  @Expose({ name: `photoPath` })
  @Column({ type: `text`, nullable: true })
  photo: string;

  // Relations
  @Exclude()
  @OneToOne(() => User, { primary: true, onDelete: `CASCADE` })
  @JoinColumn({ name: `user_id` })
  user: User;
}
