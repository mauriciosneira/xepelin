import { ICommand } from '@nestjs/cqrs';
import { AccountUpdateDto } from 'src/account/dto/account-update.dto';
import { TransactionCreateDto } from 'src/transaction/dto/transaction-create.dto';

export class CreateTransactionCommand implements ICommand {
  constructor(
    public readonly transactionData: TransactionCreateDto,
    public readonly userId: string,
  ) { }
}