import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '#server/common/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#src/modules/user/entity/user.entity';
import { Like, Repository } from 'typeorm';
import { ErrorMessagesEnum } from '#server/common/enums/error-messages.enum';
import { UserRole } from '#server/common/enums/user-role.enum';
import { AccountsListDto } from '#server/common/dto/accounts-list.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PAGE_SIZE } from '#server/common/constants/constants';
import { PaginationRequestDto } from '#server/common/dto/pagination-request.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Выгрузка информации о всех пользователях с добавлением данных из Profile
  async findAll(props: PaginationRequestDto): Promise<AccountsListDto> {
    const {
      page = 1,
      order = `id`,
      orderDirection = `ASC`,
      query = ``,
    } = props;

    const paginatedUsers = await paginate<User>(
      this.userRepository,
      {
        page,
        limit: PAGE_SIZE,
      },
      {
        join: { alias: `user`, leftJoin: { profile: `user.profile` } },
        where: (qb) => {
          qb.where({
            login: Like(`%${query}%`),
          }).orWhere(`profile.firstName LIKE :firstName`, {
            firstName: `%${query}%`,
          });
        },
        relations: [`profile`, `profile.photo`],
        order: {
          [order]: orderDirection.toUpperCase(),
        },
      },
    );

    return new Pagination<UserDto>(
      paginatedUsers.items.map((user) => user.toDto()),
      paginatedUsers.meta,
    );
  }

  async deleteUser(id): Promise<boolean> {
    const targetUser = await this.userRepository.findOne(id);

    if (!targetUser) {
      throw new NotFoundException(ErrorMessagesEnum.NO_SUCH_USER);
    }

    if (targetUser.role === UserRole.ADMIN) {
      throw new UnauthorizedException(ErrorMessagesEnum.CANT_DELETE_ADMIN);
    }
    await this.userRepository.remove(targetUser);

    return true;
  }
}
