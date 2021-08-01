import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '#src/auth/auth.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '#src/user/dto/user.dto';
import { getMessageFromValidator } from '#src/user/util/get-message-from-validator';
import { LoginUserDto } from '#src/user/dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const validationError: string = await getMessageFromValidator(
      LoginUserDto,
      {
        username,
        password,
      },
    );

    if (validationError) throw new BadRequestException(validationError);

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
