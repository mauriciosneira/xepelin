import { API } from "aws-amplify"

const TransactionService = {
  async list(accountId: Account['id']): Promise<Transaction[]> {
    return API.get("api", `/transactions/${accountId}`, {})
  },

  async create({ amount, type, accountId }: CreateTransaction): Promise<Transaction> {
    return API.post("api", "/transactions", { body: { amount, type, accountId } })
  },
}
export default TransactionService
