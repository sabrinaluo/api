import * as path from 'path';

import { OnQueueActive, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { HttpService, Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as fs from 'fs/promises';

import { getUnixTimestamp } from '../common/utils';
import { StockJobItem } from './types';

@Processor('finance')
export class FinanceProcessor {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(FinanceProcessor.name);

  private async getHistory(
    symbol: string,
    startDate?: Date,
    endDate: Date = new Date(),
  ) {
    const oneMonthAgo = endDate.getTime() - 86400 * 30 * 1000;
    try {
      const { data } = await this.httpService
        .get(`/finance/download/${symbol}`, {
          params: {
            period1: getUnixTimestamp(startDate || new Date(oneMonthAgo)),
            period2: getUnixTimestamp(endDate),
            events: 'history',
            interval: '1d',
          },
        })
        .toPromise();

      return data;
    } catch (e) {
      console.error(
        'Get history error:',
        symbol,
        startDate,
        endDate,
        e.response.statusText,
      );
    }
  }

  @OnQueueActive()
  onActive(job: Job<StockJobItem>) {
    this.logger.debug(`Processing: ${job.id} - ${job.data.ticker}`);
  }

  @OnQueueFailed()
  onFailed(job: Job<StockJobItem>, err: Error) {
    this.logger.error(`Download failed: ${job.id} - ${job.data.ticker}`);
    this.logger.error(err);
  }

  @Process({
    name: 'download',
    concurrency: 20,
  })
  async handleDownload(job: Job<StockJobItem>) {
    const { ticker, market } = job.data;
    const data = await this.getHistory(ticker, new Date('2020-05-01')); //todo 3 month ago
    return await fs.writeFile(
      path.resolve(__dirname, `../../data/download/${market}/${ticker}.csv`),
      data,
    );
  }
}
