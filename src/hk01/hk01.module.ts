import { Module } from '@nestjs/common';

import { Hk01Controller } from './hk01.controller';

@Module({
  controllers: [Hk01Controller],
})
export class Hk01Module {}
