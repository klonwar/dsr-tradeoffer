import { Injectable } from '@nestjs/common';
import { UsersService } from '#src/user/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '#src/user/dto/user.dto';
import { toUserDTO } from '#src/user/util/mapper';

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
}
