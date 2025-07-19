import { cn } from "@/lib/utils"

export default function SuccessfullAdoptionCard({
  petImage,
  name,
  className,
  type,
  gender,
  weight,
}: Readonly<PetCard>) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-[1.02]",
        className
      )}
    >
      <img src={petImage} alt={`صورة ${name}`} className="w-full h-52 object-cover" />

      <div className="p-4 space-y-2">
        <h5 className="text-xl font-bold text-primary">{name}</h5>

        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span className="bg-gray-100 px-3 py-1 rounded-full">{type}</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">{gender}</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">{weight} kg</span>
        </div>
      </div>
    </div>
  )
}
