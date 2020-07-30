import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './config';
import { OneModule } from './one/one.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    OneModule,
  ],
})
export class AppModule {}
