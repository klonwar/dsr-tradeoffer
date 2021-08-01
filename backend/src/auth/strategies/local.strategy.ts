import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '#src/auth/auth.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '#src/user/dto/user.dto';
import { validate } from 'class-validator';
import { LoginUserDto } from '#src/user/dto/login-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const validationErrors = await validate(
      plainToClass(LoginUserDto, { username, password }),
    );

    if (validationErrors.length > 0)
      // Достанем сообщения об ошибке из class-validator-а
      throw new BadRequestException(
        Object.values(validationErrors[0].constraints).join(`;`),
      );
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
