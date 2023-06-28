import { ConflictException, Injectable } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { AccountCreateDto } from '../dto/account-create.dto';
import { AccountUpdateDto } from '../dto/account-update.dto';
import { Account } from '../entities/account.entiety';
import { Type } from '../dto/account-update.dto'

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRespository: AccountRepository
  ) { }

  async createAccount(accountData: AccountCreateDto, userId: string): Promise<Account> {
    return await this.accountRespository.create(accountData, userId)
  }

  async getAccounts(userId: string): Promise<Account[]> {
    return await this.accountRespository.getAll(userId)
  }

  async getBalance(id: number, userId: string): Promise<Account> {
    const account = await this.accountRespository.get(id, userId)
    if (Array.isArray(account))
      throw new ConflictException(`You do not have an account, you need to create one fist.`)
    else return account
  }

  async update(accountData: AccountUpdateDto, userId: string): Promise<Account> {
    const account = await this.getBalance(accountData.id, userId)
    let amount = 0

    if (accountData.type === Type.WITHDRAWAL) {
      if (account.balance < accountData.amount) {
        throw new ConflictException(`You do not have enough money to withdraw.`)
      }
      amount = account.balance - accountData.amount
    } else amount = account.balance + accountData.amount

    const { id, type } = accountData
    return await this.accountRespository.update({ id, amount, type }, userId)
  }
}
