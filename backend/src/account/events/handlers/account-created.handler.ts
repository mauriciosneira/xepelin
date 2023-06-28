import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { EventStorageService } from '../../../common/event-storage.service';
import { AccountCreatedEvent } from '../impl/account-created.event'

@EventsHandler(AccountCreatedEvent)
export class AccountCreatedHandler implements IEventHandler<AccountCreatedEvent> {

  constructor(private eventStoreService: EventStorageService) { }

  async handle(event: AccountCreatedEvent): Promise<void> {
    await this.eventStoreService.createEvent(event.account, 'AccountCreatedEvent')
  }
}