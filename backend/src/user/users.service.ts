import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Profile } from '#src/user/entity/profile.entity';
import { UserDto } from '#server/common/dto/user.dto';
import { CreateUserDto } from '#server/common/dto/create-user.dto';
import { EditProfileDto } from '#server/common/dto/edit-profile.dto';
import { JwtDto } from '#server/common/dto/jwt.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private jwtService: JwtService,
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

    return userEntity;
  }

  async editProfile(
    user: User,
    plainEditProfileDto: EditProfileDto,
  ): Promise<JwtDto> {
    const { email, phone, firstName, birthday } = plainEditProfileDto;

    if (user.profile.email !== email)
      if (await this.findOneByEmail(email))
        throw new ConflictException(
          `Пользователь с такой почтой уже существует`,
        );

    if (firstName) user.profile.firstName = firstName;
    if (email) user.profile.email = email;
    if (phone) user.profile.phone = phone;
    if (birthday) user.profile.birthday = birthday as any;

    await this.profileRepository.save(user.profile);

    return user.toJwtDto(this.jwtService);
  }
}
