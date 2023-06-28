import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountService } from '../../service/account.service';
import { GetAccountsQuery } from '../impl';

@QueryHandler(GetAccountsQuery)
export class GetAccountHandler implements IQueryHandler<GetAccountsQuery> {
  constructor(private readonly accountService: AccountService) { }

  async execute(query: GetAccountsQuery) {
    return this.accountService.getAccounts(query.userId);
  }
}