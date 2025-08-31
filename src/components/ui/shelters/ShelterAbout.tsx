// components/shelters/ShelterAbout.tsx
interface Props {
  about?: string
  name?: string
}
export default function ShelterAbout({ about, name }: Props) {
  return (
    <section className="mb-12">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 md:p-8 px-3 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
          حول {name}
        </h2>
        <div className="prose prose-lg text-gray-700 leading-relaxed">
          <p className="whitespace-pre-line">{about}</p>
        </div>
      </div>
    </section>
  )
}
