import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionCreateDto } from '../dto/transaction-create.dto';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRespository: TransactionRepository,
  ) { }

  async getTransactions(accountId: number, userId: string): Promise<Transaction[]> {
    return await this.transactionRespository.getTransactionsByAccountId(accountId, userId)
  }

  async createTransaction(data: TransactionCreateDto, userId: string): Promise<Transaction> {
    return await this.transactionRespository.create(data, userId)
  }
}
