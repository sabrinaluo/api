import { BullModule } from '@nestjs/bull';
import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FinanceController } from './finance.controller';
import { FinanceProcessor } from './finance.processor';
import { FinanceService } from './finance.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      baseURL: 'https://query1.finance.yahoo.com/v7',
    }),
    BullModule.registerQueueAsync({
      name: 'finance',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FinanceController],
  providers: [FinanceService, FinanceProcessor],
})
export class FinanceModule {}
