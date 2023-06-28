import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTransactionsQuery } from '../queries/impl';
import { CreateTransactionCommand } from '../commands/impl/create-transaction.command';
import { Type } from '../dto/transaction-create.dto'

describe('TransactionController', () => {
  let controller: TransactionController;
  let queryBus: QueryBus;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [QueryBus, CommandBus],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('getTransactions', () => {
    it('should return an array of transactions', async () => {

      const mockResult = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];
      jest.spyOn(queryBus, 'execute').mockResolvedValue(mockResult);

      const accountId = 123;
      const request = { user: { idUser: 'd458c448-2021-7063-32d2-36f945a36d38' } };

      const result = await controller.getTransactions(accountId, request);

      expect(queryBus.execute).toHaveBeenCalledWith(
        new GetTransactionsQuery(accountId, request.user.idUser),
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('createTransaction', () => {
    it('should create a new transaction', async () => {

      const mockResult = { id: 1, amount: 100, type: Type.DEPOSIT };
      jest.spyOn(commandBus, 'execute').mockResolvedValue(mockResult);

      const transactionData = { accountId: 1, amount: 100, type: Type.DEPOSIT };
      const request = { user: { idUser: 'd458c448-2021-7063-32d2-36f945a36d38' } };

      const result = await controller.createTransaction(transactionData, request);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateTransactionCommand(transactionData, request.user.idUser),
      );
      expect(result).toEqual(mockResult);
    });
  });
});
