import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { AccountCreatedEvent } from '../../events/impl/account-created.event';
import { CreateAccountCommand } from '../impl/create-account.command';
import { AccountService } from '../../service/account.service';
import { Account } from '../../entities/account.entiety';

@Injectable()
@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler {
  constructor(
    private readonly event$: EventBus,
    private readonly accountService: AccountService
  ) { }

  async execute(command: CreateAccountCommand): Promise<Account> {
    const account = await this.accountService.createAccount(command.accountData, command.userId)
    this.event$.publish(new AccountCreatedEvent(account))
    return account
  }
}