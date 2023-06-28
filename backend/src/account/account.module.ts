import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountService } from './service/account.service';
import { AccountController } from './controller/account.controller';
import { AccountRepository } from './repositories/account.repository';
import { PrismaService } from '../database/prisma.service';
import { EventsHandlers } from './events/handlers';
import { CommandHandlers } from './commands/handlers';
import { EventStorageService } from '../common/event-storage.service';
import { QueryHandlers } from './queries/handlers';
import { EventStorageRepository } from '../common/event-storage.repository';

@Module({
  imports: [CqrsModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    AccountRepository,
    ...EventsHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    PrismaService,
    EventStorageRepository,
    EventStorageService
  ]
})
export class AccountModule { }
