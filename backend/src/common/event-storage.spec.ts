import { Test, TestingModule } from '@nestjs/testing';
import { EventStorageService } from './event-storage.service';
import { EventStorageRepository } from './event-storage.repository';

describe('EventStorageService', () => {
  let eventStorageService: EventStorageService;
  let eventStorageRepository: EventStorageRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventStorageService,
        {
          provide: EventStorageRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    eventStorageService = module.get<EventStorageService>(EventStorageService);
    eventStorageRepository = module.get<EventStorageRepository>(EventStorageRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createEvent', () => {
    it('should create an event', async () => {
      const payload = {
        id: 3,
        name: "Juan Carlos",
        number: 123,
        balance: 0
      };
      const eventName = 'AccountCreatedEvent';

      jest.spyOn(eventStorageRepository, 'create').mockResolvedValue(undefined);

      await eventStorageService.createEvent(payload, eventName);

      expect(eventStorageRepository.create).toHaveBeenCalledWith(payload, eventName);
    });
  });
});
