import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '#src/modules/auth/guards/jwt-auth.guard';
import { UploadsModule } from '#src/modules/uploads/uploads.module';
import { JwtModule } from '@nestjs/jwt';
import { ItemsModule } from './modules/items/items.module';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';

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
    ItemsModule,
    AccountsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
