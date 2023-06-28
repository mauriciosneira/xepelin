import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountService } from '../../service/account.service';
import { GetBalanceQuery } from '../impl/get-balance.query';


@QueryHandler(GetBalanceQuery)
export class GetBalanceHandler implements IQueryHandler<GetBalanceQuery> {
  constructor(private readonly accountService: AccountService) { }

  async execute(query: GetBalanceQuery) {
    return this.accountService.getBalance(query.id, query.userId)
  }
}