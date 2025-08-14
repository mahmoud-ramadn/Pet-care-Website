import { zodResolver } from "@hookform/resolvers/zod"
import { useSetAtom } from "jotai"
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react"
import { toast } from "sonner"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { LoginUser } from "@/apis/auth"
import { tokenAtom } from "@/atoms"

import { type LoginFormSchema, loginFormSchema } from "./Schema"

export default function LoginForm() {
  const setToken = useSetAtom(tokenAtom)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

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

      const userDataInfo = response.data.result ?? ""
      const token = response.token
      localStorage.setItem("token", token)
      localStorage.setItem("userInfoData", JSON.stringify(userDataInfo))

      setToken(token)

      toast.success(response.status)
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Email or password is incorrect.")
    }
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm w-full max-w-md p-8 space-y-8 transition-all duration-300 hover:shadow-3xl">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full -translate-x-16 -translate-y-16 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full translate-x-12 translate-y-12 blur-xl"></div>

      {/* Header Section */}
      <div className="text-center space-y-3 relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-2 transition-transform duration-300 hover:scale-105">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent tracking-tight">
          تسجيل الدخول
        </h2>
        <p className="text-gray-600 font-medium">أدخل بيانات حسابك للمتابعة</p>
      </div>

      <Form value={form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  البريد الإلكتروني
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="example@email.com"
                      {...field}
                      className="pl-4 pr-11 h-12 bg-white/70 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:bg-white/90 focus:bg-white shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-sm font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  كلمة المرور
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      className="pl-4 pr-20 h-12 bg-white/70 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:bg-white/90 focus:bg-white shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <div className="w-px h-4 bg-gray-300"></div>
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-sm font-medium" />
              </FormItem>
            )}
          />

          <ButtonWithLoading
            type="submit"
            size="lg"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            loading={form.formState.isSubmitting}
          >
            <LogIn className="w-5 h-5 ml-2" />
            تسجيل الدخول
          </ButtonWithLoading>
        </form>
      </Form>

      {/* Footer */}
      <div className="text-center relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <span className="text-gray-500 text-sm font-medium">أو</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        <p className="text-gray-600">
          ليس لديك حساب؟{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline decoration-2 underline-offset-2"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  )
}
