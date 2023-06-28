"use client"
import { Authenticator, Button, Card, Flex, translations } from "@aws-amplify/ui-react"
import "@aws-amplify/ui-react/styles.css"
import "@/amplify-config"
import { I18n } from "aws-amplify"
I18n.putVocabularies(translations)
I18n.setLanguage("es")

const username = {
  placeholder: "Escriba su nombre de usuario",
}
const confirm_password = {
  placeholder: "Confirme su contraseña",
}
const confirmation_code = {
  placeholder: "Escriba su código de confirmación",
}
const formFields = {
  signIn: {
    username,
  },
  signUp: {
    email: { order: 1 },
    username,
    password: {},
    confirm_password,
  },
  forceNewPassword: {
    password: {},
  },
  resetPassword: {
    username,
  },
  confirmResetPassword: {
    confirmation_code,
    confirm_password,
  },
}

interface Props {
  children: React.ReactNode
}
export default function Login({ children }: Props) {
  return (
    <>
      <Authenticator formFields={formFields}>
        {({ signOut, user }) => (
          <>
            <Card variation="outlined" marginBottom={"1em"}>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                {user?.username}
                <Button size="small" onClick={signOut}>
                  Cerrar Sesíon
                </Button>
              </Flex>
            </Card>
            {children}
          </>
        )}
      </Authenticator>
    </>
  )
}
