export class GetTransactionsQuery {
  constructor(
    public readonly accountId: number,
    public readonly userId: string,
  ) { }
}