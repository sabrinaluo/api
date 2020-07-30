import { HttpModule, Module } from '@nestjs/common';
import * as cheerio from 'cheerio';

import { OneController } from './one.controller';
import { OneService } from './one.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      baseURL: 'http://wufazhuce.com',
      transformResponse: function (data) {
        return cheerio.load(data, { decodeEntities: false });
      },
    }),
  ],
  controllers: [OneController],
  providers: [OneService],
})
export class OneModule {}
