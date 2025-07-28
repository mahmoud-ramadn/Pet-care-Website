import { Badge } from "@/components/ui/badge"

export function PetPreferences({ types, sizes }: { types?: string[]; sizes?: string[] }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Pet Preferences</h2>
      <div className="flex flex-wrap gap-2">
        {types?.map((type) => (
          <Badge key={type} variant="secondary" className="px-3 py-1">
            {type}
          </Badge>
        ))}
        {sizes?.map((size) => (
          <Badge key={size} variant="secondary" className="px-3 py-1">
            {size}
          </Badge>
        ))}
      </div>
    </section>
  )
}
