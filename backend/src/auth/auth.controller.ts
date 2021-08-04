import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from '#src/auth/auth.service';
import { Public } from '#src/auth/decorators/public.decorator';
import { CreateUserDto } from '#server/common/dto/create-user.dto';

@Controller(`auth`)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post(`login`)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post(`register`)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
