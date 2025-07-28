import SwiperWrapper from "@/components/ui/SwiperWrapper"

export function ServiceGallery({ images }: { images?: string[] }) {
  if (!images?.length) return null

  return (
    <div className="mb-6">
      <SwiperWrapper preview={4} isPagination>
        {images.map((image, index) => (
          <div key={index} className="aspect-video w-full rounded-lg overflow-hidden">
            <img src={image} alt={`Service ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </SwiperWrapper>
    </div>
  )
}
