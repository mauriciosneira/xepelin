import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { EventStorageService } from '../../../common/event-storage.service';
import { TransactionCreatedEvent } from '../impl/transaction-created.event';

@EventsHandler(TransactionCreatedEvent)
export class TransactionCreatedHandler implements IEventHandler<TransactionCreatedEvent> {

  constructor(private eventStoreService: EventStorageService) { }

  async handle(event: TransactionCreatedEvent): Promise<void> {
    await this.eventStoreService.createEvent(event.transaction, 'TransactionCreatedEvent')
  }
}