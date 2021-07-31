import { Injectable } from '@nestjs/common';
import { UsersService } from '#src/user/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserSessionState } from '#src/auth/interfaces/user-session.interface';
import { JwtPayload } from '#src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserSessionState> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: UserSessionState) {
    const payload = { username: user.login, role: user.role } as JwtPayload;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
