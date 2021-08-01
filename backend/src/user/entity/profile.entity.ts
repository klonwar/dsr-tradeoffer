import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '#src/user/entity/user.entity';

@Entity()
export class Profile {
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

  @Column({ type: `text`, nullable: true })
  photo: string;

  // Relations
  @OneToOne(() => User, { primary: true })
  @JoinColumn({ name: `user_id` })
  user: User;
}
