import { Amplify, Auth } from "aws-amplify"

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
    userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: process.env.NEXT_PUBLIC_API_URL,
        custom_header: async () => {
          const token = (await Auth.currentSession()).getIdToken().getJwtToken()
          return { Authorization: `Bearer ${token}` }
        },
      },
    ],
  },
})
