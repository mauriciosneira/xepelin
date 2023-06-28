export class GetBalanceQuery {
  constructor(
    public readonly id: number,
    public readonly userId: string,
  ) { }
}