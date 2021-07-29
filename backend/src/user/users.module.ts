import { Module } from '@nestjs/common';
import { UsersService } from '#src/user/users.service';
import { UsersController } from '#src/user/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '#src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
