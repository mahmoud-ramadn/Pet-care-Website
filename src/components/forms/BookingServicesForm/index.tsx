import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { ButtonWithLoading } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form } from "@/components/ui/form"
import { FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CreateBookingRequest } from "@/apis/services"


const BookingFormSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"),
  servicePrice: z.number().min(0, "Service price must be positive"),
  requestTotalPrice: z.number().min(0, "Total price must be positive"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().min(1, "Duration is required"),
  location: z.array(z.string()).length(2, "Location coordinates are required"),
  notes: z.string().optional(),
  pickUp: z.boolean().optional(),
  payment: z.string().optional(),
  country: z.string().optional(),
  number: z.string().optional(),
  petsNumber: z.string().optional(),
  completed: z.boolean().optional(),
  remindMe3Hours: z.boolean().optional(),
  cardNumber: z.string().optional(),
  cardExpireDate: z.string().optional(),
  cardSecurityCode: z.string().optional(),
  saveCard: z.boolean().optional(),
})

type TypeBookingFormSchema = z.infer<typeof BookingFormSchema>

interface Props {
  values?: TypeBookingFormSchema
  onSuccess?: () => void
}

interface ErrorResponse {
  data?: {
    message?: string
    code?: number
  }
  message?: string
  code?: number
}

export default function BookingServicesForm({ values, onSuccess }: Props) {
  const [loading, setLoading] = useState<boolean>(false)

  const serviceTypes: string[] = [
    "Pet Walking",
    "Pet Veterinary",
    "Pet Training",
    "Pet Taxi",
    "Pet Sitting",
    "Pet Grooming",
    "Pet Boarding",
  ]

  const durations: string[] = ["Full Day", "Half Day", "More than 1 Day"]
  const paymentMethods: string[] = ["Visa", "Master Card", "Local Cards", "Mobile Wallet", "Cash"]

  const form = useForm<TypeBookingFormSchema>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      serviceType: values?.serviceType ?? "",
      servicePrice: values?.servicePrice ?? 0,
      requestTotalPrice: values?.requestTotalPrice ?? 0,
      date: values?.date ?? "",
      time: values?.time ?? "",
      duration: values?.duration ?? "",
      location: values?.location ?? ["", ""],
      notes: values?.notes ?? "",
      pickUp: values?.pickUp ?? false,
      payment: values?.payment ?? "",
      country: values?.country ?? "",
      number: values?.number ?? "",
      petsNumber: values?.petsNumber ?? "",
      completed: values?.completed ?? false,
      remindMe3Hours: values?.remindMe3Hours ?? false,
      cardNumber: values?.cardNumber ?? "",
      cardExpireDate: values?.cardExpireDate ?? "",
      cardSecurityCode: values?.cardSecurityCode ?? "",
      saveCard: values?.saveCard ?? false,
    },
  })

  const watchedPayment = form.watch("payment")
  const showCardFields = ["Visa", "Master Card", "Local Cards"].includes(watchedPayment || "")

  async function onSubmit(inputs: TypeBookingFormSchema): Promise<void> {
    try {
      setLoading(true)
      await CreateBookingRequest(inputs as unknown  as request)

      toast.success("Booking created successfully!")

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: unknown) {
      const err = error as ErrorResponse
      const message = err?.data?.message ?? err?.message ?? ""

      toast.error(message || "Failed to create booking. Unexpected error.")
    } finally {
      setLoading(false)
    }
  }





  const handleNumberChange = (value: string, onChange: (value: number) => void): void => {
    const numValue = parseFloat(value)
    onChange(isNaN(numValue) ? 0 : numValue)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 mb-2">Pet Booking Services</h1>
        <p className="text-sm sm:text-base dark:text-white text-gray-600">Schedule your pet care services with ease</p>
      </div>

      <Form value={form}>
        <FormLoading loading={loading}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {/* Service Details Section */}
            <div className="light:bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-lg border border-blue-200">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-800">Service Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Service Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 sm:h-auto">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceTypes.map((type: string) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="petsNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Number of Pets</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter number of pets"
                          className="h-10 sm:h-auto text-sm sm:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

               

                <FormField
                  control={form.control}
                  name="servicePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Service Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="h-10 sm:h-auto text-sm sm:text-base"
                          value={field.value || ""}
                          onChange={(e) => handleNumberChange(e.target.value, field.onChange)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </div>


            <div className=" light:bg-gradient-to-r from-green-50 to-teal-50 p-4 sm:p-6 rounded-lg border border-green-200">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-800">Schedule & Location</h2>

              <div className="flex flex-wrap gap-3">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Date *</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-10 sm:h-auto text-sm sm:text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Time *</FormLabel>
                      <FormControl>
                        <Input type="time" className="h-10 sm:h-auto text-sm sm:text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Duration *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 sm:h-auto">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {durations.map((duration: string) => (
                            <SelectItem key={duration} value={duration}>
                              {duration}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" className="h-10 sm:h-auto text-sm sm:text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="mt-3 sm:mt-4">
                    <FormLabel className="text-sm sm:text-base">Special Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special instructions or notes..."
                        className="resize-none min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Payment & Options Section */}
            <div className=" light:bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-lg border border-purple-200">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-purple-800">Payment & Options</h2>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <FormField
                  control={form.control}
                  name="payment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 sm:h-auto">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentMethods.map((method: string) => (
                            <SelectItem key={method} value={method}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requestTotalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Total Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="h-10 sm:h-auto text-sm sm:text-base"
                          value={field.value || ""}
                          onChange={(e) => handleNumberChange(e.target.value, field.onChange)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel className="text-sm sm:text-base">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter phone number"
                          className="h-10 sm:h-auto text-sm sm:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>





              {/* Checkboxes */}
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                <FormField
                  control={form.control}
                  name="pickUp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm sm:text-base cursor-pointer">Pick-up service required</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="remindMe3Hours"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm sm:text-base cursor-pointer">Remind me 3 hours before</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {showCardFields && (
                  <FormField
                    control={form.control}
                    name="saveCard"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm sm:text-base cursor-pointer">
                            Save card for future bookings
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            <ButtonWithLoading
              type="submit"
              size="lg"
              className="w-full mt-4 sm:mt-6 h-12 text-sm sm:text-base"
              loading={loading}
            >
              {values ? "Update Booking" : "Book Pet Service"}
            </ButtonWithLoading>
          </form>
        </FormLoading>
      </Form>
    </div>
  )
}
