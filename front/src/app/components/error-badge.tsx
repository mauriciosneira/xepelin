"use client"
import { Badge, Flex, Text } from "@aws-amplify/ui-react"

interface Props {
  error?: string
}
export default function ErrorBadge({ error }: Props) {
  if(!error) return <></>
  return (
    <Flex justifyContent={'center'} marginTop={10}>
      <Badge variation="error">
        <Text>{error}</Text>
      </Badge>
    </Flex>
  )
}
