import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Profile } from '#src/user/entity/profile.entity';
import { toUserDTO } from '#src/user/util/mapper';
import { UserDto } from '#server/common/dto/user.dto';
import { CreateUserDto } from '#server/common/dto/create-user.dto';

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

  findOneByEmail(email: string): Promise<Profile | undefined> {
    return this.profileRepository.findOne({ email });
  }

  findUserProfile(user: User): Promise<Profile> {
    return this.profileRepository.findOne(user.id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, password } = createUserDto;

    const userEntity = this.userRepository.create({
      login: username,
      password,
    });
    await this.userRepository.save(userEntity);

    const { email, phone, firstName, photo, birthday } = createUserDto;

    const userProfile = this.profileRepository.create({
      user_id: userEntity.id,
      email,
      phone,
      firstName,
      photo,
      birthday: new Date(birthday),
    });

    await this.profileRepository.save(userProfile);

    return toUserDTO(userEntity, userProfile);
  }
}
