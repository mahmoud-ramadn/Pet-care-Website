import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { RegisterUser } from "@/apis/auth"

import { SignUpFormSchema, type SignUpFormSchemaType } from "./scema"

export default function RegisterForm() {
  const navigate = useNavigate()
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

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">إنشاء حساب جديد</h2>
        <p className="text-sm text-muted-foreground mt-1">املأ البيانات لإنشاء حسابك الشخصي</p>
      </div>

      <Form value={form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم</FormLabel>
                <FormControl>
                  <Input placeholder="اسمك الكامل" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تأكيد كلمة المرور</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="أعد إدخال كلمة المرور" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonWithLoading type="submit" size="lg" className="w-full">
            {"تسجيل"}
          </ButtonWithLoading>
        </form>
      </Form>

      <div className="text-center text-sm">
        لديك حساب بالفعل؟{" "}
        <Link to="/login" className="text-primary hover:underline font-medium">
          تسجيل الدخول
        </Link>
      </div>
    </div>
  )
}
