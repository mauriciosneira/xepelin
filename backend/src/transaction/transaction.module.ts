import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TransactionService } from './service/transaction.service';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionController } from './controller/transaction.controller';
import { AccountRepository } from '../account/repositories/account.repository';
import { EventStorageService } from '../common/event-storage.service';
import { CommandHandlers } from './commands/handlers';
import { EventsHandlers } from './events/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountService } from '../account/service/account.service';
import { QueryHandlers } from './queries/handlers';
import { EventStorageRepository } from '../common/event-storage.repository';
import { TransactionMiddleware } from './middleware/transaction.middleware';

@Module({
  imports: [CqrsModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    AccountRepository,
    ...EventsHandlers,
    ...CommandHandlers,
    ...QueryHandlers,
    TransactionRepository,
    PrismaService,
    EventStorageRepository,
    EventStorageService,
    AccountService
  ]
})
export class TransactionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TransactionMiddleware)
      .forRoutes({ path: 'transactions', method: RequestMethod.POST });
  }
}