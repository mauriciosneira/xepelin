import { Injectable } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../impl/create-transaction.command';
import { Transaction } from '../../entities/transaction.entity';
import { TransactionService } from '../../service/transaction.service';
import { TransactionCreatedEvent } from '../../events/impl/transaction-created.event';
import { AccountService } from '../../../account/service/account.service';
import { AccountUpdatedEvent } from '../../../account/events/impl/account-update.event';


@Injectable()
@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler {
  constructor(
    private readonly event$: EventBus,
    private readonly transactionService: TransactionService,
    private readonly accountService: AccountService
  ) { }

  async execute(command: CreateTransactionCommand): Promise<Transaction> {

    const { accountId, amount, type } = command.transactionData
    const updatedAccount = await this.accountService.update(
      { id: accountId, amount, type },
      command.userId,
    )

    const transaction = await this.transactionService.createTransaction(command.transactionData, command.userId)

    this.event$.publish(new TransactionCreatedEvent(transaction))

    this.event$.publish(new AccountUpdatedEvent(updatedAccount));

    return transaction
  }
}