import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TradeOfferEntity } from '#src/modules/trade/entity/trade-offer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(TradeOfferEntity)
    private tradeoffersRepository: Repository<TradeOfferEntity>,
  ) {}
}
