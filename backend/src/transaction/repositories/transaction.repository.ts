import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { Transaction } from "../entities/transaction.entity";
import { TransactionCreateDto } from "../dto/transaction-create.dto";

@Injectable()
export class TransactionRepository {

  constructor(private prisma: PrismaService) { }

  async getTransactionsByAccountId(accountId: number, userId: string): Promise<Transaction[]> {
    try {
      const transactions = await this.prisma.transaction.findMany({
        where: { userId, accountId },
        select: {
          id: true,
          amount: true,
          type: true,
          createdAt: true,
          accountId: true
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      return transactions
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.FORBIDDEN);
    }
  }

  async create(data: TransactionCreateDto, userId: string): Promise<Transaction> {
    try {
      const transaction = await this.prisma.transaction.create({
        data: {
          type: data.type,
          amount: data.amount,
          userId: userId,
          accountId: data.accountId
        },
        select: {
          id: true,
          amount: true,
          type: true,
          userId: true,
          accountId: true,
          createdAt: true
        }
      })
      return transaction
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.FORBIDDEN);
    }
  }
}