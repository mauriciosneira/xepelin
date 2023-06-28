"use client"
import AccountService from "@/services/accounts"
import { Badge, Button, Flex, Text, TextField } from "@aws-amplify/ui-react"
import { FormEventHandler, useState } from "react"
import ErrorBadge from "./error-badge"

interface Props {
  refreshData: () => void
}
export default function AccountForm({ refreshData }: Props) {
  const [error, setError] = useState("")
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const name = document.getElementById("name") as HTMLInputElement
    const number = document.getElementById("number") as HTMLInputElement
    if (!name || !number) return
    AccountService.create(name.value, +number.value)
    .then(refreshData)
    .catch((e) => {
      setError(e?.response?.data?.message || '')})
    refreshData();
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
        Crear Cuenta
      </Text>
      <Flex direction={"column"}>
        <TextField id="name" label="Nombre completo" />
        <TextField id="number" label="Número de cuenta" type="number" />
        <Button size="small" variation="primary" type="submit">
          Crear Cuenta
        </Button>
      </Flex>
      <Flex justifyContent={"center"} marginTop={"1em"}>
        <Badge variation="warning">
          <Text variation="primary" fontSize=".8em" fontStyle="normal">
            Para continuar es necesario registrar una para continuar.
          </Text>
        </Badge>
      </Flex>
      <ErrorBadge error={error} />
    </form>
  )
}
