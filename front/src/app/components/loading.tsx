"use client"
import { Card, Flex, Loader } from "@aws-amplify/ui-react"

export default function Loading() {
  return (
    <Card variation="outlined" height={100}>
      <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
        <Loader size="large" />
      </Flex>
    </Card>
  )
}
