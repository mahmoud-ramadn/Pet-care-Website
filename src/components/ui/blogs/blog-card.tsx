export default function BlogCard({ plogImage, description, link }: Blog) {
  return (
    <div className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img src={plogImage || "/placeholder-image.jpg"} alt={description} className="w-full h-48 object-cover" />

      <div className="p-6">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {description}
          </h3>
        </a>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:underline mt-4"
        >
          Read more
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}
