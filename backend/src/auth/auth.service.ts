import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '#src/user/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '#src/user/dto/user.dto';
import { toUserDTO } from '#src/user/util/mapper';
import { JwtDto } from '#src/user/dto/jwt.dto';
import { CreateUserDto } from '#src/user/dto/create-user.dto';
import { getMessageFromValidator } from '#src/user/util/get-message-from-validator';

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
    const validationError: string = await getMessageFromValidator(
      CreateUserDto,
      createUserDto,
    );

    if (validationError) throw new BadRequestException(validationError);

    const { username, email } = createUserDto;

    if (await this.usersService.findOneByUsername(username))
      throw new ConflictException(
        `Пользователь с таким логином уже существует`,
      );

    if (await this.usersService.findOneByEmail(email))
      throw new ConflictException(`Пользователь с такой почтой уже существует`);

    let newUser: UserDto;
    try {
      newUser = await this.usersService.createUser(createUserDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return {
      access_token: this.jwtService.sign(newUser),
    };
  }
}
