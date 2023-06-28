import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { EventStorageService } from '../../../common/event-storage.service';
import { AccountUpdatedEvent } from '../impl/account-update.event'

@EventsHandler(AccountUpdatedEvent)
export class AccountUpdatedHandler implements IEventHandler<AccountUpdatedEvent> {

  constructor(private eventStoreService: EventStorageService) { }

  async handle(event: AccountUpdatedEvent): Promise<void> {
    await this.eventStoreService.createEvent(event.account, 'AccountUpdatedEvent');
  }
}