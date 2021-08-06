import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Profile } from '#src/user/entity/profile.entity';
import { UserDto } from '#server/common/dto/user.dto';
import { CreateUserDto } from '#server/common/dto/create-user.dto';
import { EditProfileDto } from '#server/common/dto/edit-profile.dto';

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
    const users = await this.userRepository.find({ relations: [`profile`] });
    return users.map((user) => user.toDto());
  }

  findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { login: username },
      relations: [`profile`],
    });
  }

  findOneByEmail(email: string): Promise<Profile | undefined> {
    return this.profileRepository.findOne({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const { email, phone, firstName, photoPath, birthday } = createUserDto;

    const userProfile = this.profileRepository.create({
      email,
      phone,
      firstName,
      birthday: new Date(birthday),
      photo: photoPath,
    });

    const userEntity = this.userRepository.create({
      login: username,
      password,
      profile: userProfile,
    });

    await this.userRepository.save(userEntity);

    return toUserDTO(userEntity);
  }
}
