import { Helmet } from "react-helmet"

import LoginForm from "@/components/forms/login"

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to your account" />
      </Helmet>

      <LoginForm />
    </>
  )
}
