import { Helmet } from "react-helmet"

import RegisterForm from "@/components/forms/register"

export default function Register() {
  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register for an account and start using our services." />
        <meta property="og:title" content="Register" />
        <meta property="og:description" content="Create your account and join our platform." />
      </Helmet>

      <RegisterForm />
    </>
  )
}
