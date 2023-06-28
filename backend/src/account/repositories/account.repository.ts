import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Account } from '../entities/account.entiety';
import { AccountCreateDto } from '../dto/account-create.dto';
import { AccountUpdateDto } from '../dto/account-update.dto';

@Injectable()
export class AccountRepository {

  constructor(private prisma: PrismaService) { }

  async get(id: number, userId: string): Promise<Account | []> {
    try {
      const account = await this.prisma.account.findFirst({
        where: { id, userId },
        select: {
          id: true,
          name: true,
          balance: true,
          number: true
        },
      })
      return account ? account : [];
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.FORBIDDEN);
    }
  }

  async getAll(userId: string): Promise<Account[]> {
    try {
      const accounts = await this.prisma.account.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          balance: true,
          number: true
        },
      })
      return accounts
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.FORBIDDEN);
    }
  }

  async update(params: AccountUpdateDto, userId: string): Promise<Account> {
    try {
      const account = await this.prisma.account.update({
        where: { id_userId: { id: params.id, userId } },
        data: { balance: params.amount },
      })

      return account;
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.FORBIDDEN);
    }
  }

  async create(data: AccountCreateDto, userId: string): Promise<Account> {
    try {
      const account = await this.prisma.account.create({
        data: {
          name: data.name,
          number: data.number,
          userId: userId,
          balance: 0
        },
        select: {
          id: true,
          name: true,
          balance: true,
          number: true
        }
      })
      return account
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.FORBIDDEN);
    }
  }
}
