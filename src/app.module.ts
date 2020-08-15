import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { Hk01Module } from './hk01/hk01.module';
import { OneModule } from './one/one.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../public'),
    }),
    OneModule,
    AuthModule,
    UserModule,
    Hk01Module,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
