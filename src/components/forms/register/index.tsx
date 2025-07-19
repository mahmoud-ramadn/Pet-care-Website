import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { SignUpFormSchema, type SignUpFormSchemaType } from "./scema"

type Props = {
  className?: string
}

export default function RegisterForm({ className }: Readonly<Props>) {
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
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={cn("   md:w-full  py-20 container", className)}>
      <Form value={form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" md:w-2/3  w-5/6 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم</FormLabel>
                <FormControl>
                  <Input placeholder="الاسم" {...field} />
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
                  <Input placeholder="البريد الإلكتروني" {...field} />
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
                  <Input type="password" placeholder="كلمة المرور" {...field} />
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
                  <Input type="password" placeholder="تأكيد كلمة المرور" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonWithLoading type="submit" size="lg" loading={form.formState.isSubmitting}>
            تسجيل
          </ButtonWithLoading>
        </form>
      </Form>
    </div>
  )
}
