import { Clock, Heart, MapPin, Share2 } from "lucide-react"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import { BookingDialog } from "../services/Booking-dialog"

export default function BookingCard({
  price,
  pricePer,
  from,
  to,
  questions,
}: {
  price?: number
  pricePer?: string
  from?: number
  to?: number
  questions?: string[]
}) {
  const [open, setOpen] = useState(false)

  console.log(open)

  return (
    <>
      <BookingDialog open={open} setOpen={setOpen} />
      <div className="sticky top-8 border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-2xl font-bold">${price}</p>
            <p className="text-gray-500">per {pricePer}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-gray-500">Availability</p>
              <p className="font-medium">
                {from} - {to}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">Service area</p>
            </div>
          </div>
        </div>

        <Button onClick={() => setOpen(true)} className="w-full" size="lg">
          Book Now
        </Button>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-medium mb-3">Service questions</h3>
          <div className="space-y-3">
            {questions?.map((q, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
