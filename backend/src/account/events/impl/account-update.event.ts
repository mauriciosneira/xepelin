import { IEvent } from '@nestjs/cqrs';
import { Account } from '../../entities/account.entiety';

export class AccountUpdatedEvent implements IEvent {
  constructor(public readonly account: Account) { }
}