import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountCreateDto } from '../dto/account-create.dto';
import { AccountUpdateDto, Type } from '../dto/account-update.dto';
import { Account } from '../entities/account.entiety';
import { AccountRepository } from '../repositories/account.repository';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountRepository,
          useValue: {
            get: jest.fn(),
            getAll: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAccount', () => {
    it('should create an account', async () => {
      const accountData: AccountCreateDto = {
        name: 'John Doe',
        number: 12345678,
      };
      const userId = 'd458c448-2021-7063-32d2-36f945a36d38';
      const createdAccount: Account = {
        id: 1,
        name: accountData.name,
        balance: 0,
        number: accountData.number,
      };

      jest.spyOn(accountRepository, 'create').mockResolvedValue(createdAccount);

      const result = await accountService.createAccount(accountData, userId);

      expect(accountRepository.create).toHaveBeenCalledWith(accountData, userId);
      expect(result).toEqual(createdAccount);
    });
  });

  describe('getAccounts', () => {
    it('should retrieve accounts for a user', async () => {
      const userId = 'd458c448-2021-7063-32d2-36f945a36d38';
      const accounts: Account[] = [
        {
          id: 1,
          name: 'John Doe',
          balance: 500,
          number: 12345678,
        },
        {
          id: 2,
          name: 'Jane Smith',
          balance: 1000,
          number: 87654321,
        },
      ];

      jest.spyOn(accountRepository, 'getAll').mockResolvedValue(accounts);

      const result = await accountService.getAccounts(userId);

      expect(accountRepository.getAll).toHaveBeenCalledWith(userId);
      expect(result).toEqual(accounts);
    });
  });

  describe('getBalance', () => {
    it('should retrieve the balance of an account', async () => {
      const accountId = 1;
      const userId = 'd458c448-2021-7063-32d2-36f945a36d38';
      const account: Account = {
        id: accountId,
        name: 'John Doe',
        balance: 500,
        number: 12345678,
      };

      jest.spyOn(accountRepository, 'get').mockResolvedValue(account);

      const result = await accountService.getBalance(accountId, userId);

      expect(accountRepository.get).toHaveBeenCalledWith(accountId, userId);
      expect(result).toEqual(account);
    });

    it('should throw ConflictException if the account is not found', async () => {
      const accountId = 1;
      const userId = 'd458c448-2021-7063-32d2-36f945a36d38';

      jest.spyOn(accountRepository, 'get').mockResolvedValue([]);

      await expect(
        accountService.getBalance(accountId, userId),
      ).rejects.toThrow(ConflictException);
      expect(accountRepository.get).toHaveBeenCalledWith(accountId, userId);
    });
  });

  describe('update', () => {
    it('should update the account for a withdrawal', async () => {
      const accountData: AccountUpdateDto = {
        id: 1,
        amount: 200,
        type: Type.WITHDRAWAL,
      };
      const userId = 'd458c448-2021-7063-32d2-36f945a36d38';
      const account: Account = {
        id: 1,
        name: 'John Doe',
        balance: 500,
        number: 12345678,
      };
      const updatedAccount: Account = {
        ...account,
        balance: account.balance - accountData.amount,
      };

      jest.spyOn(accountRepository, 'get').mockResolvedValue(account);
      jest.spyOn(accountRepository, 'update').mockResolvedValue(updatedAccount);

      const result = await accountService.update(accountData, userId);

      expect(accountRepository.get).toHaveBeenCalledWith(accountData.id, userId);
      expect(accountRepository.update).toHaveBeenCalledWith(
        {
          id: accountData.id,
          amount: updatedAccount.balance,
          type: accountData.type,
        },
        userId,
      );
      expect(result).toEqual(updatedAccount);
    });

    it('should throw ConflictException if the account balance is not sufficient for withdrawal', async () => {
      const accountData: AccountUpdateDto = {
        id: 1,
        amount: 1000,
        type: Type.WITHDRAWAL,
      };
      const userId = 'd458c448-2021-7063-32d2-36f945a36d38';
      const account: Account = {
        id: 1,
        name: 'John Doe',
        balance: 500,
        number: 12345678,
      };

      jest.spyOn(accountRepository, 'get').mockResolvedValue(account);

      await expect(
        accountService.update(accountData, userId),
      ).rejects.toThrow(ConflictException);
      expect(accountRepository.get).toHaveBeenCalledWith(accountData.id, userId);
    });
  });
});
