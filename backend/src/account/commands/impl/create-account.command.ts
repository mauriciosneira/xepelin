import { ICommand } from '@nestjs/cqrs';
import { AccountCreateDto } from '../../dto/account-create.dto';

export class CreateAccountCommand implements ICommand {
  constructor(
    public readonly accountData: AccountCreateDto,
    public readonly userId: string,
  ) { }
}