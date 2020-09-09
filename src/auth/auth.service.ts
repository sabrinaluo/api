import * as crypto from 'crypto';

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { user as User } from '@prisma/client';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  encryptMd5(str: string) {
    const salt = this.configService.get('salt');
    const md5Hash = crypto
      .createHash('md5')
      .update(str + salt)
      .digest('hex');

    return md5Hash;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser({
      username,
    });

    if (user?.password === this.encryptMd5(pass)) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ username }: User) {
    return {
      access_token: this.jwtService.sign({
        username,
      }),
    };
  }

  async signUp({ username, password }) {
    if (!username || !password) {
      throw new BadRequestException('invalid username / password');
    }

    const isUsernameExisted = await this.usersService.getUser({ username });

    if (isUsernameExisted) {
      throw new ForbiddenException('username is existed');
    }

    const { createdAt } = await this.usersService.createUser({
      username,
      password: this.encryptMd5(password),
    });

    return {
      username,
      createdAt,
    };
  }
}
