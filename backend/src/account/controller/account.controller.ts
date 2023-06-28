import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountCommand } from '../commands/impl/create-account.command';
import { AccountCreateDto } from '../dto/account-create.dto';
import { Account } from '../entities/account.entiety'
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { GetAccountsQuery } from '../queries/impl/get-accounts.query';
import { GetBalanceQuery } from '../queries/impl/get-balance.query';


@ApiTags('accounts')
@Controller('accounts')
export class AccountController {

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) { }

  @Post()
  @ApiQuery({ name: 'name', example: 'Jhon Gomez' })
  @ApiQuery({ name: 'number', example: '12345678' })
  @ApiOkResponse({ description: 'Create an Account', type: Account })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createAccount(
    @Body() accountData: AccountCreateDto, @Request() request): Promise<Account> {
    return await this.commandBus.execute(new CreateAccountCommand(accountData, request.user.idUser));
  }

  @Get()
  @ApiOkResponse({ description: 'List of Accounts', type: [Account] })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getAccounts(@Request() request): Promise<Account[]> {
    return await this.queryBus.execute(new GetAccountsQuery(request.user.idUser));
  }

  @Get(':id/balance')
  @ApiQuery({ name: 'id', example: '1' })
  @ApiOkResponse({ description: 'Account Balance', type: Account })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getBalance(@Param('id', ParseIntPipe) id: number, @Request() request): Promise<Account | []> {
    return await this.queryBus.execute(new GetBalanceQuery(id, request.user.idUser))
  }
}
