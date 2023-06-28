import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionCreateDto } from '../dto/transaction-create.dto';
import { Transaction } from '../entities/transaction.entity';
import { Type } from '../dto/transaction-create.dto';

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let transactionRepository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useValue: {
            getTransactionsByAccountId: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
    transactionRepository = module.get<TransactionRepository>(TransactionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransactions', () => {
    it('should retrieve transactions for an account', async () => {
      const accountId = 1;
      const userId = 'd458c448-2021-7063-32d2-36f945a36d38';
      const transactions: Transaction[] = [
        {
          id: 1,
          amount: 1000,
          type: "DEPOSIT",
          createdAt: new Date("2023-06-27T13:08:40.291Z"),
          accountId: 1
        }
      ];

      jest.spyOn(transactionRepository, 'getTransactionsByAccountId').mockResolvedValue(transactions);

      const result = await transactionService.getTransactions(accountId, userId);

      expect(transactionRepository.getTransactionsByAccountId).toHaveBeenCalledWith(accountId, userId);
      expect(result).toEqual(transactions);
    });
  });

  describe('createTransaction', () => {
    it('should create a transaction', async () => {
      const transactionData: TransactionCreateDto = {
        amount: 1000,
        type: Type.DEPOSIT,
        accountId: 1
      };
      const userId = 'd458c448-2021-7063-32d2-36f945a36d38';
      const createdTransaction: Transaction = {
        id: 8,
        amount: 1000,
        type: "DEPOSIT",
        accountId: 1,
        createdAt: new Date("2023-06-27T13:08:40.291Z")
      };

      jest.spyOn(transactionRepository, 'create').mockResolvedValue(createdTransaction);

      const result = await transactionService.createTransaction(transactionData, userId);

      expect(transactionRepository.create).toHaveBeenCalledWith(transactionData, userId);
      expect(result).toEqual(createdTransaction);
    });
  });
});
