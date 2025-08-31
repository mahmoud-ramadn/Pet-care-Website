// components/shelters/ShelterInfo.tsx
import { Award, Calendar, CheckCircle, Clock, MapPin, MessageSquare, Phone, Star, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Props {
  shelter: any
}

export default function ShelterInfo({ shelter }: Props) {
  return (
    <div className="lg:w-1/2 space-y-6">
      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text light:text-transparent text-white leading-tight">
          {shelter?.shelterName}
        </h1>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span className="font-bold text-lg text-amber-700">{shelter?.rate?.toFixed(1)}</span>
            <span className="text-amber-600">({shelter?.numberOfRates} مراجعة)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium">موثق</span>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span className="text-gray-700">{shelter?.locations?.address}</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
          <Phone className="w-5 h-5 text-green-500" />
          <span className="font-medium text-gray-700">{shelter?.shelterNumber}</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
          <Clock className="w-5 h-5 text-purple-500" />
          <span className="font-medium text-gray-700">مفتوح ٢٤ ساعة</span>
        </div>
      </div>

      {/* Desc */}
      <div className="p-4 bg-gray-50 rounded-xl">
        <p className="text-gray-700 leading-relaxed">{shelter?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-3">
        <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
          <Users className="w-4 h-4" />
          {shelter?.pets_Id?.length || 0} حيوان أليف
        </Badge>
        <Badge
          variant="secondary"
          className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full"
        >
          <Calendar className="w-4 h-4" />
          تأسس في {new Date(shelter?.createdAt ?? 0)?.getFullYear()}
        </Badge>
        <Badge
          variant="secondary"
          className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full"
        >
          <Award className="w-4 h-4" />
          موثوق
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <MessageSquare className="w-5 h-5 ml-2" />
          تواصل معنا
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-12 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
        >
          تبرع الآن
        </Button>
      </div>
    </div>
  )
}
