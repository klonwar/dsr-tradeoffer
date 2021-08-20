import { Controller } from '@nestjs/common';
import { TradeService } from '#src/modules/trade/trade.service';

@Controller(`trade`)
export class TradeController {
  constructor(private tradeService: TradeService) {}
}
