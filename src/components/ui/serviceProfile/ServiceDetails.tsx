import { Clock, DollarSign } from "lucide-react"

export function ServiceDetails({
  from,
  to,
  price,
  pricePer,
}: {
  from?: number
  to?: number
  price?: number
  pricePer?: string
}) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Service Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <DollarSign className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-medium">
              ${price} per {pricePer}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
