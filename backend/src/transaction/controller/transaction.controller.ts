import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTransactionCommand } from '../commands/impl/create-transaction.command';
import { TransactionCreateDto } from '../dto/transaction-create.dto';
import { Transaction } from '../entities/transaction.entity';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTransactionsQuery } from '../queries/impl';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) { }

  @Get(':accountId')
  @ApiOkResponse({ description: 'List of Transactions', type: [Transaction] })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getTransactions(@Param('accountId', ParseIntPipe) accountId: number, @Request() request): Promise<Transaction[]> {
    return await this.queryBus.execute(new GetTransactionsQuery(accountId, request.user.idUser))
  }

  @Post()
  @ApiQuery({ name: 'accountId', example: '12345678' })
  @ApiQuery({ name: 'type', example: 'DEPOSIT' })
  @ApiOkResponse({ description: 'Create an Transaction', type: Transaction })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 409,
    description: 'You do not have enough money to withdraw.',
  })
  @ApiResponse({
    status: 409,
    description: 'You do not have an account, you need to create one fist.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createTransaction(
    @Body() transactionData: TransactionCreateDto, @Request() request): Promise<Transaction> {
    return await this.commandBus.execute(new CreateTransactionCommand(transactionData, request.user.idUser));
  }
}
