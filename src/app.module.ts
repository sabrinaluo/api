import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config';
import { Hk01Module } from './hk01/hk01.module';
import { OneModule } from './one/one.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    OneModule,
    Hk01Module,
  ],
})
export class AppModule {}
