"use client"
import useAccount from "@/hooks/useAccount"
import { Card, TabItem, Tabs } from "@aws-amplify/ui-react"
import AccountForm from "./components/account-form"
import BalanceCard from "./components/balance-card"
import Loading from "./components/loading"
import TransactionForm from "./components/transaction-form"
import TransactionList from "./components/transaction-list"
import Login from "./login"

export default function Home() {
  return (
    <Login>
      <Secure />
    </Login>
  )
}

function Secure() {
  const { data, isLoading, refreshData } = useAccount()
  if (isLoading) return <Loading />
  const withAccount = !!data
  return (
    <Card variation="outlined">
      {!withAccount && <AccountForm refreshData={refreshData} />}
      {withAccount && <BalanceCard account={data?.account} />}
      {withAccount && (
        <Tabs justifyContent="flex-start">
          <TabItem title="Transacción">
            <TransactionForm accountId={data.account.id} refreshData={refreshData} />
          </TabItem>
          {data.transactions.length && (
            <TabItem title="Historial">
              <TransactionList transactions={data.transactions} />
            </TabItem>
          )}
        </Tabs>
      )}
    </Card>
  )
}
