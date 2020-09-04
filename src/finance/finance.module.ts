import { BullModule } from '@nestjs/bull';
import { HttpModule, Module } from '@nestjs/common';

import { FinanceController } from './finance.controller';
import { FinanceProcessor } from './finance.processor';
import { FinanceService } from './finance.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      baseURL: 'https://query1.finance.yahoo.com/v7',
    }),
    BullModule.registerQueue({
      name: 'finance',
      redis: {
        host: 'localhost', //todo config
        port: 6379,
      },
    }),
  ],
  controllers: [FinanceController],
  providers: [FinanceService, FinanceProcessor],
})
export class FinanceModule {}
