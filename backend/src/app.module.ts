import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '#src/auth/guards/jwt-auth.guard';
import { UploadsModule } from '#src/uploads/uploads.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    UploadsModule,
    {
      ...JwtModule.register({
        secret: process.env[`JWT_SECRET_TOKEN`],
      }),
      global: true,
    },
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
