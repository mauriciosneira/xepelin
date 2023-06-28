import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTransactionsQuery } from '../impl';
import { TransactionService } from '../../service/transaction.service';

@QueryHandler(GetTransactionsQuery)
export class GetTransactionHandler implements IQueryHandler<GetTransactionsQuery> {
  constructor(private readonly transactionService: TransactionService) { }

  async execute(query: GetTransactionsQuery) {
    return this.transactionService.getTransactions(query.accountId, query.userId);
  }
}