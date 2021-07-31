import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from '#src/auth/auth.service';
import { Public } from '#src/auth/decorators/public.decorator';

@Controller(`auth`)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post(`login`)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
