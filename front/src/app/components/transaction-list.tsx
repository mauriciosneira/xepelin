"use client"
import { Card, Flex, Text } from "@aws-amplify/ui-react"

interface Props {
  transactions: Transaction[]
}

export default function TransactionList({ transactions }: Props) {
  return (
    <>
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
        Historial
      </Text>
      {transactions.map((transaction) => (
        <Card variation="outlined" key={transaction.id} marginBottom=".25em">
          <Flex alignItems={"center"}>
            <div>
              <Text fontWeight={800} fontSize=".8em">
                Tipo de operación
              </Text>
              <Text fontWeight={400} fontSize="1em">
                {transaction.type === 'DEPOSIT'? 'DEPOSITO' : 'RETIRO'}
              </Text>
            </div>
            <Text marginLeft={"auto"} variation={transaction.type==='DEPOSIT' ? "success" : "error"}>
              $ {transaction.amount}
            </Text>
          </Flex>
        </Card>
      ))}
    </>
  )
}
