import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TradeOfferEntity } from '#src/modules/trade/entity/trade-offer.entity';
import { Not, Repository } from 'typeorm';
import { PaginationRequestDto } from '#server/common/dto/pagination-request.dto';
import { User } from '#src/modules/user/entity/user.entity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PAGE_SIZE } from '#server/common/constants/constants';
import { TradeoffersListDto } from '#server/common/dto/tradeoffers-list.dto';
import { CreateTradeofferDto } from '#server/common/dto/create-tradeoffer.dto';
import { ItemEntity } from '#src/modules/user-items/entity/item.entity';
import { ErrorMessagesEnum } from '#server/common/enums/error-messages.enum';
import { TradeofferDto } from '#server/common/dto/tradeoffer.dto';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(TradeOfferEntity)
    private tradeoffersRepository: Repository<TradeOfferEntity>,
    @InjectRepository(ItemEntity)
    private itemsRepository: Repository<ItemEntity>,
  ) {}

  async getUserOwnedTradeoffers(
    user: User,
    props: PaginationRequestDto,
  ): Promise<TradeoffersListDto> {
    const {
      page = 1,
      order = `id`,
      orderDirection = `ASC`,
      query = ``,
    } = props;

    // todo прокинуть фотографии

    const paginatedTradeoffers = await paginate<TradeOfferEntity>(
      this.tradeoffersRepository,
      {
        page,
        limit: PAGE_SIZE,
      },
      {
        where: {
          offered_item: {
            user: {
              id: user.id,
            },
          },
        },
        relations: [
          `offered_item`,
          `offered_item.user`,
          `offered_item.item_category`,
          `offered_item.trade_category`,
          `desired_item`,
          `desired_item.user`,
          `desired_item.item_category`,
          `desired_item.trade_category`,
        ],
        order: {
          [order]: orderDirection.toUpperCase(),
        },
      },
    );

    return new Pagination<TradeofferDto>(
      paginatedTradeoffers.items.map((to) => to.toDto()),
      paginatedTradeoffers.meta,
    );
  }

  async getTradeoffer(user: User, id: number): Promise<TradeOfferEntity> {
    return await this.tradeoffersRepository.findOne({
      where: { id, user },
      relations: [``],
    });
  }

  async createTradeoffer(
    user: User,
    createTradeofferDto: CreateTradeofferDto,
  ): Promise<TradeOfferEntity> {
    const { offered_item_id, desired_item_id } = createTradeofferDto;
    const offeredItem = await this.itemsRepository.findOne(offered_item_id, {
      relations: [
        `to_where_offered`,
        `user`,
        `photos`,
        `item_category`,
        `trade_category`,
      ],
    });
    const desiredItem = await this.itemsRepository.findOne(desired_item_id, {
      relations: [`user`, `photos`, `item_category`, `trade_category`],
    });

    // Базовые проверки на существование, принадлежность, возможность выложить

    if (!offeredItem || !desiredItem)
      throw new NotFoundException(ErrorMessagesEnum.NO_SUCH_ITEM);

    if (offeredItem.user_id !== user.id)
      throw new UnauthorizedException(ErrorMessagesEnum.NOT_YOUR_ITEM);

    if (desiredItem.user_id === user.id)
      throw new BadRequestException(ErrorMessagesEnum.CANT_DESIRE_YOUR_ITEM);

    if (offeredItem.to_where_offered)
      throw new BadRequestException(ErrorMessagesEnum.ITEM_ALREADY_OFFERED);

    // Проверка на соответствие категорий

    if (
      offeredItem.item_category_id !== desiredItem.trade_category_id ||
      offeredItem.trade_category_id !== desiredItem.item_category_id
    )
      throw new BadRequestException(ErrorMessagesEnum.MISMATCHED_CATEGORIES);

    // Создание трейдоффера

    const newTradeoffer = this.tradeoffersRepository.create({
      offered_item: offeredItem,
      desired_item: desiredItem,
    });

    await this.tradeoffersRepository.save(newTradeoffer);

    return newTradeoffer;
  }

  async getAvailableItems(user: User, id: number): Promise<Array<ItemEntity>> {
    const offeredItem = await this.itemsRepository.findOne(id, {
      relations: [`to_where_offered`],
    });

    // Базовые проверки на существование, принадлежность, возможность выложить

    if (!offeredItem)
      throw new NotFoundException(ErrorMessagesEnum.NO_SUCH_ITEM);

    const isUserItem = offeredItem.user_id !== user.id;

    if (offeredItem.to_where_offered)
      throw new BadRequestException(ErrorMessagesEnum.ITEM_ALREADY_OFFERED);

    // Поиск вещей с подходящими категориями

    return await this.itemsRepository.find({
      where: {
        user_id: Not(user.id),
        item_category_id: offeredItem.trade_category_id,
        trade_category_id: offeredItem.item_category_id,
      },
      relations: [`photos`, `user`, `item_category`, `trade_category`],
    });
  }

  async cancelTradeoffer(user: User, id: number) {
    const tradeoffer = await this.tradeoffersRepository.findOne(id, {
      relations: [`offered_item`, `desired_item`],
    });

    if (!tradeoffer)
      throw new NotFoundException(ErrorMessagesEnum.NO_SUCH_TRADEOFFER);

    if (
      tradeoffer.offered_item.user_id !== user.id &&
      tradeoffer.desired_item.user_id !== user.id
    )
      throw new UnauthorizedException(ErrorMessagesEnum.NOT_YOUR_TRADEOFFER);

    await this.tradeoffersRepository.remove(tradeoffer);

    return true;
  }
}
