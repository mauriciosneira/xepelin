import AccountService from "@/services/accounts"
import TransactionService from "@/services/transactions"
import React from "react"

async function fecthAccount() {
  const accounts = await AccountService.list()
  if (!accounts.length) return null
  const mainAccount = accounts[0]
  const transactions = await TransactionService.list(mainAccount.id)
  return {
    account: mainAccount,
    transactions,
  }
}
type useAccountType = {
  account: Account
  transactions: Transaction[]
} | null

export default function useAccount() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [loaderMinTime, setLoaderMinTime] = React.useState(true)

  const [data, setData] = React.useState<useAccountType>(null)
  const refreshData = async () => {
    setLoaderMinTime(true)
    setIsLoading(true)
    const data = await fecthAccount()
    setData(data)
    setIsLoading(false)
    setTimeout(() => {
      setLoaderMinTime(false)
    }, 600)
  }

  React.useEffect(() => {
    refreshData()
  }, [])

  return {
    data,
    isLoading: isLoading || loaderMinTime,
    refreshData,
  }
}
