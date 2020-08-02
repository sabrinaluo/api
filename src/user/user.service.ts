import { BadRequestException, Injectable } from '@nestjs/common';
import { userWhereUniqueInput as UserWhereUniqueInput } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userWhereUniqueInput: UserWhereUniqueInput) {
    return this.prisma.user.findOne({
      where: userWhereUniqueInput,
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser({ username, password }) {
    const now = new Date();
    return this.prisma.user.create({
      data: {
        username,
        password,
        createdAt: now,
        updatedAt: now,
      },
    });
  }
}
