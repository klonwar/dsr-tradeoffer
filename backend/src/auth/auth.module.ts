import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '#src/user/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '#src/auth/strategies/local.strategy';
import { AuthController } from '#src/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '#src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env[`JWT_SECRET_TOKEN`],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
