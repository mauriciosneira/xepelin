interface Account {
  id: number
  name: string
  number: number
  balance: number
}

type TransactionType = "DEPOSIT" | "WITHDRAWAL"

interface Transaction {
  id: number
  amount: number
  type: TransactionType
  createdAt: string
  accountId: Account["id"]
}

interface CreateTransaction {
  amount: Transaction["amount"]
  type: Transaction["type"]
  accountId: Transaction["accountId"]
}
