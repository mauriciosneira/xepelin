import { IEvent } from '@nestjs/cqrs';
import { Account } from '../../entities/account.entiety';

export class AccountCreatedEvent implements IEvent {
  constructor(public readonly account: Account) {
  }
}