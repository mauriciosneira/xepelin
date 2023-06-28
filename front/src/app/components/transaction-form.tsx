"use client"
import TransactionService from "@/services/transactions"
import { Badge, Button, Card, Flex, SelectField, Text, TextField, View } from "@aws-amplify/ui-react"
import { ChangeEventHandler, FormEventHandler, useState } from "react"
import ErrorBadge from "./error-badge"
interface Props {
  refreshData: () => void
  accountId: Account["id"]
}
export default function TransactionForm({ accountId, refreshData }: Props) {
  const [type, setType] = useState(0)
  const [error, setError] = useState("")
  const onTypeChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setType(+evt.currentTarget?.value)
  }
  const operationLabel = type === 0 ? "Depositar" : "Retirar"
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setError("")
    const amount = document.getElementById("amount") as HTMLInputElement
    const type = document.getElementById("type") as HTMLInputElement
    if (!amount || !type) return
    if (!amount.value || !type.value) return
    TransactionService.create({
      accountId,
      amount: +amount.value,
      type: ["DEPOSIT", "WITHDRAWAL"][+type.value] as TransactionType,
    })
      .then(refreshData)
      .catch((e) => {
        setError(e?.response?.data?.message || '')})
  }
  return (
    <form onSubmit={onSubmit}>
      <Text
        variation="primary"
        as="strong"
        lineHeight="3em"
        fontWeight={800}
        fontSize="1.5em"
        fontStyle="normal"
        textDecoration="none"
        width="30vw"
      >
        Nueva Transacción
      </Text>
      <Flex direction={"column"}>
        <SelectField id="type" label="Tipo de operación" onChange={onTypeChange}>
          <option value={0}>Despósito</option>
          <option value={1}>Retiro</option>
        </SelectField>
        <TextField id="amount" label={`Ingresa el monto a ${operationLabel}`} />
        <Button size="small" variation="primary" type="submit">
          {operationLabel}
        </Button>
      </Flex>
      <ErrorBadge error={error} />
    </form>
  )
}
