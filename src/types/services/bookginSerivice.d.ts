type Book = {
  _id: string
  userId: string
  serviceImage: string
  paymentImage: string
  serviceType: string

  location: string[] // أو نوع تاني لو location object
  petsId: string[] // أو object[] لو تفاصيل الحيوانات
  date: string // ممكن تعمله Date لو بتحوله
  duration: string
  completed: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

type BookingResponse = {
  results: number
  request: Booking[]
}
