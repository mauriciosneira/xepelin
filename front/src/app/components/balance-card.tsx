"use client"
import { Card, Flex, Text } from "@aws-amplify/ui-react"

interface Props {
  account: Account
}

export default function BalanceCard({ account }: Props) {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} marginBottom={"1em"}>
      <div>
        <Text fontWeight={800} fontSize=".8em">
        Nº Cuenta: {account.number}
        </Text>
        <Text fontWeight={400} fontSize="1em">
        {account.name}
        </Text>
      </div>
      <Text marginLeft={"auto"} fontSize="1.5em">
        $  {account.balance}
      </Text>
    </Flex>
  )
}
