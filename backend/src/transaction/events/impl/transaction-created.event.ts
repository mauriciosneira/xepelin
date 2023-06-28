import { IEvent } from '@nestjs/cqrs';
import { Transaction } from 'src/transaction/entities/transaction.entity';

export class TransactionCreatedEvent implements IEvent {
  constructor(public readonly transaction: Transaction) {
  }
}