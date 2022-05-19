import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  create(account: Prisma.AccountCreateInput) {
    return this.prisma.account.create({ data: account });
  }

  findAll() {
    return this.prisma.account.findMany();
  }

  findOne(id: number) {
    return this.prisma.account.findUnique({ where: { id } });
  }

  update(id: number, accountInfo: Prisma.AccountUpdateInput) {
    return this.prisma.account.update({ where: { id }, data: accountInfo });
  }

  remove(id: number) {
    return this.prisma.account.delete({ where: { id } });
  }
}
