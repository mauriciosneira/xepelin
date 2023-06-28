import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAccountCommand } from '../commands/impl/create-account.command';
import { GetAccountsQuery } from '../queries/impl/get-accounts.query';
import { GetBalanceQuery } from '../queries/impl/get-balance.query';
import { AccountCreateDto } from '../dto/account-create.dto';
import { Account } from '../entities/account.entiety';

describe('AccountController', () => {
  let controller: AccountController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [CommandBus, QueryBus],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('createAccount', () => {
    it('should create an account', async () => {
      const accountData: AccountCreateDto = {
        name: 'John Doe',
        number: 12345678,
      };
      const userId = 'd458c448-2021-7063-32d2-36f945a36d38';

      const commandSpy = jest.spyOn(commandBus, 'execute').mockImplementationOnce(() => Promise.resolve(new Account()));

      const result = await controller.createAccount(accountData, { user: { idUser: userId } });

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Account);
      expect(commandSpy).toBeCalledWith(new CreateAccountCommand(accountData, userId));
    });
  });

  describe('getAccounts', () => {
    it('should get a list of accounts', async () => {
      const userId = 'd458c448-2021-7063-32d2-36f945a36d38';

      const querySpy = jest.spyOn(queryBus, 'execute').mockImplementationOnce(() => Promise.resolve([new Account()]));

      const result = await controller.getAccounts({ user: { idUser: userId } });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result[0]).toBeInstanceOf(Account);
      expect(querySpy).toBeCalledWith(new GetAccountsQuery(userId));
    });
  });

  describe('getBalance', () => {
    it('should get account balance', async () => {
      const accountId = 1;
      const userId = 'd458c448-2021-7063-32d2-36f945a36d38';

      const querySpy = jest
        .spyOn(queryBus, 'execute')
        .mockImplementationOnce(() => Promise.resolve(new Account()));

      const result = await controller.getBalance(accountId, { user: { idUser: userId } });

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Account);
      expect(querySpy).toBeCalledWith(new GetBalanceQuery(accountId, userId));
    });
  });
});
