import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react"
import { toast } from "sonner"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { RegisterUser } from "@/apis/auth"

import { SignUpFormSchema, type SignUpFormSchemaType } from "./scema"

export default function RegisterForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: SignUpFormSchemaType) {
    const userDataWithRole: RegisterFormType = {
      ...values,
      role: "user",
    }
    try {
      const response = await RegisterUser(userDataWithRole)
      toast.success(response?.status)
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error("Email is Already Exist")
    }
  }

  // Password validation helpers
  const watchPassword = form.watch("password")
  const watchConfirmPassword = form.watch("confirmPassword")
  const passwordsMatch = watchPassword && watchConfirmPassword && watchPassword === watchConfirmPassword

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm w-full max-w-md p-8 space-y-8 transition-all duration-300 hover:shadow-3xl">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full translate-x-16 -translate-y-16 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full -translate-x-12 translate-y-12 blur-xl"></div>

      {/* Header Section */}
      <div className="text-center space-y-3 relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-2 transition-transform duration-300 hover:scale-105">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent tracking-tight">
          إنشاء حساب جديد
        </h2>
        <p className="text-gray-600 font-medium">املأ البيانات لإنشاء حسابك الشخصي</p>
      </div>

      <Form value={form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 relative z-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-green-500" />
                  الاسم
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="اسمك الكامل"
                      {...field}
                      className="pl-4 pr-11 h-12 bg-white/70 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 hover:bg-white/90 focus:bg-white shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-sm font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-500" />
                  البريد الإلكتروني
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="example@email.com"
                      {...field}
                      className="pl-4 pr-11 h-12 bg-white/70 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 hover:bg-white/90 focus:bg-white shadow-sm"
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
                  <Lock className="w-4 h-4 text-green-500" />
                  كلمة المرور
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      className="pl-4 pr-20 h-12 bg-white/70 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 hover:bg-white/90 focus:bg-white shadow-sm"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-500" />
                  تأكيد كلمة المرور
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="أعد إدخال كلمة المرور"
                      {...field}
                      className={`pl-4 pr-20 h-12 bg-white/70 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 hover:bg-white/90 focus:bg-white shadow-sm ${
                        passwordsMatch && watchConfirmPassword ? "border-green-300 bg-green-50/50" : ""
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <div className="w-px h-4 bg-gray-300"></div>
                      {passwordsMatch && watchConfirmPassword ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </FormControl>
                {passwordsMatch && watchConfirmPassword && (
                  <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    كلمات المرور متطابقة
                  </p>
                )}
                <FormMessage className="text-red-500 text-sm font-medium" />
              </FormItem>
            )}
          />

          <ButtonWithLoading
            type="submit"
            size="lg"
            className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-green-500/20 focus:outline-none mt-6"
            loading={form.formState.isSubmitting}
          >
            <UserPlus className="w-5 h-5 ml-2" />
            إنشاء الحساب
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
          لديك حساب بالفعل؟{" "}
          <Link
            to="/login"
            className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 hover:underline decoration-2 underline-offset-2"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  )
}
