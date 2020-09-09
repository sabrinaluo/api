import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { CsvItem, StockJobItem, StockMarket } from './types';
import {
  getTickerSector,
  getYahooTickerByMarket,
  parseStockInfo,
} from './utils';

interface Stock {
  ticker: string;
  sector: string;
}

@Injectable()
export class FinanceService {
  private readonly stocks: Record<StockMarket, Stock[]>;

  constructor(
    @InjectQueue('finance') private financeQueue: Queue<StockJobItem>,
  ) {
    this.stocks = Object.entries(StockMarket).reduce(
      (acc, [_, market]) => ({
        ...acc,
        [market]: null,
      }),
      {} as Record<StockMarket, Stock[]>,
    );
  }

  private async getStocksByMarket(market: StockMarket) {
    const data = this.stocks[market];
    if (!data) {
      this.stocks[market] = await getTickerSector(market);
    }

    return this.stocks[market];
  }

  async getQueue() {
    return this.financeQueue.getJobs(['completed', 'waiting']);
  }

  async startDownload(maxItem = Infinity) {
    Object.entries(StockMarket).forEach(async ([_, market]) => {
      const stocks = await this.getStocksByMarket(market);
      stocks.slice(0, maxItem).map((o) =>
        this.financeQueue.add(
          'download',
          {
            market,
            ticker: o.ticker,
          },
          {
            backoff: {
              type: 'fixed',
              delay: 200,
            },
          },
        ),
      );
    });

    return 'OK';
  }
}
