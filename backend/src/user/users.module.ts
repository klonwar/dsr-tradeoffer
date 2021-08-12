import { Module } from '@nestjs/common';
import { UsersService } from '#src/user/users.service';
import { UsersController } from '#src/user/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '#src/user/entity/user.entity';
import { Profile } from '#src/user/entity/profile.entity';
import { PhotoEntity } from '#src/photos/entity/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, PhotoEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
