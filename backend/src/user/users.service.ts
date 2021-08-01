import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Profile } from '#src/user/entity/profile.entity';
import { UserDto } from '#src/user/dto/user.dto';
import { toUserDTO } from '#src/user/util/mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  // Выгрузка информации о всех пользователях с добавлением данных из Profile
  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    const profiles = (
      await Promise.allSettled(users.map((user) => this.findUserProfile(user)))
    ).map((item) => (item.status === `fulfilled` ? item.value : null));

    return users.map((user, index) => toUserDTO(user, profiles[index]));
  }

  findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { login: username } });
  }

  findUserProfile(user: User): Promise<Profile> {
    return this.profileRepository.findOne(user.id);
  }
}
