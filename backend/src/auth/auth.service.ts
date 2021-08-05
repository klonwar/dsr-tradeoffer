import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '#src/user/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { toUserDTO } from '#src/user/util/mapper';
import { UserDto } from '#server/common/dto/user.dto';
import { JwtDto } from '#server/common/dto/jwt.dto';
import { CreateUserDto } from '#server/common/dto/create-user.dto';
import * as fs from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserDto> {
    // Найдем пользователя по переданным данным и проверим пароль
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Загрузим дополнительную информацию о пользователе
      const userProfile = await this.usersService.findUserProfile(user);

      return toUserDTO(user, userProfile);
    }
    return null;
  }

  login(user: UserDto): JwtDto {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<JwtDto> {
    try {
      const { username, email } = createUserDto;

      if (await this.usersService.findOneByUsername(username))
        throw new ConflictException(
          `Пользователь с таким логином уже существует`,
        );

      if (await this.usersService.findOneByEmail(email))
        throw new ConflictException(
          `Пользователь с такой почтой уже существует`,
        );

      let newUser: UserDto;
      try {
        newUser = await this.usersService.createUser(createUserDto);
      } catch (e) {
        throw new InternalServerErrorException(e);
      }

      return {
        access_token: this.jwtService.sign(newUser),
      };
    } catch (e) {
      if (createUserDto.photoPath) {
        // Удаляем загруженную фотографию, если произошла ошибка
        await fs.unlink(createUserDto.photoPath, () => {});
      }
      throw e;
    }
  }
}
