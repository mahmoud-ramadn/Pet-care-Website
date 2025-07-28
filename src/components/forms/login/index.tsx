import { zodResolver } from "@hookform/resolvers/zod"
import { useSetAtom } from "jotai"
import { toast } from "sonner"

import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

// import { useNavigate } from "react-router"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { LoginUser } from "@/apis/auth"
import { tokenAtom } from "@/atoms"

import { type LoginFormSchema, loginFormSchema } from "./Schema"

export default function LoginForm() {
  const setToken = useSetAtom(tokenAtom)

  const navigate = useNavigate()

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormSchema) {
    try {
      const response = await LoginUser(values)

      const user = response.data.result
      const token = response.token

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      setToken(token)

      toast.success(response.status)
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Email or password is incorrect.")
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl  w-full max-w-md  p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">تسجيل الدخول</h2>
        <p className="text-sm text-muted-foreground mt-1">أدخل بيانات حسابك للمتابعة</p>
      </div>

      <Form value={form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة المرور</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonWithLoading type="submit" size="lg" className="w-full" loading={form.formState.isSubmitting}>
            تسجيل الدخول
          </ButtonWithLoading>
        </form>
      </Form>

      <div className="text-center text-sm">
        ليس لديك حساب؟{" "}
        <Link to="/signup" className="text-primary hover:underline font-medium">
          إنشاء حساب
        </Link>
      </div>
    </div>
  )
}
