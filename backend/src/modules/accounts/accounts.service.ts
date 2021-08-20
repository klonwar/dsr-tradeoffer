import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '#server/common/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';
import { ErrorMessagesEnum } from '#server/common/enums/error-messages.enum';
import { UserRole } from '#server/common/enums/user-role.enum';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Выгрузка информации о всех пользователях с добавлением данных из Profile
  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find({
      relations: [`profile`, `profile.photo`],
    });
    return users.map((user) => user.toDto());
  }

  async deleteUser(id): Promise<UserDto[]> {
    const targetUser = await this.userRepository.findOne(id);

    if (!targetUser) {
      throw new NotFoundException(ErrorMessagesEnum.NO_SUCH_USER);
    }

    if (targetUser.role === UserRole.ADMIN) {
      throw new UnauthorizedException(ErrorMessagesEnum.CANT_DELETE_ADMIN);
    }
    await this.userRepository.remove(targetUser);

    return await this.findAll();
  }
}
