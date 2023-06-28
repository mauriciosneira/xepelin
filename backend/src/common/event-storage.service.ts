import { Injectable } from '@nestjs/common';
import { EventStorageRepository } from './event-storage.repository';

@Injectable()
export class EventStorageService {
  constructor(
    private readonly eventStorageRespository: EventStorageRepository,
  ) { }

  async createEvent(payload: any, eventName: string): Promise<void> {
    await this.eventStorageRespository.create(payload, eventName)
  }
}
