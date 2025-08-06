import { Link } from "react-router-dom"

import Error from "@/components/ui/animations/error"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <Error  />
        <h1 className="text-3xl font-bold text-gray-800">الصفحة غير موجودة</h1>
        <p className="text-lg text-gray-600">عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها</p>
      </div>
      <Link
        to="/"
        className="rounded-lg bg-primary px-6 py-3 text-lg font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  )
}
