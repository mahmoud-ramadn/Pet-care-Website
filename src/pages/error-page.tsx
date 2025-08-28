import { AlertTriangle, ArrowLeft, Bug, Home, RefreshCw, Server, UserX, Wifi } from "lucide-react"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate, useRouteError } from "react-router"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorInfo {
  status?: number
  statusText?: string
  message?: string
  stack?: string
}

export default function ErrorPage() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const error = useRouteError() as ErrorInfo
  const [errorDetails, setErrorDetails] = useState<ErrorInfo>({})
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (error) {
      setErrorDetails({
        status: error.status || 500,
        statusText: error.statusText || "Internal Server Error",
        message: error.message || "Something went wrong",
        stack: error.stack,
      })
    }
  }, [error])

  const getErrorIcon = (status?: number) => {
    switch (status) {
      case 401:
        return <UserX className="w-16 h-16 text-red-500" />
      case 403:
        return <AlertTriangle className="w-16 h-16 text-orange-500" />
      case 404:
        return <AlertTriangle className="w-16 h-16 text-blue-500" />
      case 500:
        return <Server className="w-16 h-16 text-red-600" />
      case 503:
        return <Wifi className="w-16 h-16 text-yellow-500" />
      default:
        return <Bug className="w-16 h-16 text-gray-500" />
    }
  }

  const getErrorTitle = (status?: number) => {
    switch (status) {
      case 401:
        return i18n.language === "ar" ? "غير مصرح لك بالوصول" : "Unauthorized Access"
      case 403:
        return i18n.language === "ar" ? "ممنوع الوصول" : "Access Forbidden"
      case 404:
        return i18n.language === "ar" ? "الصفحة غير موجودة" : "Page Not Found"
      case 500:
        return i18n.language === "ar" ? "خطأ في الخادم" : "Server Error"
      case 503:
        return i18n.language === "ar" ? "الخدمة غير متاحة" : "Service Unavailable"
      default:
        return i18n.language === "ar" ? "حدث خطأ غير متوقع" : "Unexpected Error"
    }
  }

  const getErrorDescription = (status?: number) => {
    switch (status) {
      case 401:
        return i18n.language === "ar"
          ? "يجب عليك تسجيل الدخول للوصول إلى هذه الصفحة"
          : "You need to be logged in to access this page"
      case 403:
        return i18n.language === "ar"
          ? "ليس لديك صلاحية للوصول إلى هذا المورد"
          : "You don't have permission to access this resource"
      case 404:
        return i18n.language === "ar"
          ? "عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها"
          : "Sorry, we couldn't find the page you're looking for"
      case 500:
        return i18n.language === "ar"
          ? "حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً"
          : "A server error occurred. Please try again later"
      case 503:
        return i18n.language === "ar"
          ? "الخدمة غير متاحة حالياً. يرجى المحاولة مرة أخرى لاحقاً"
          : "Service is currently unavailable. Please try again later"
      default:
        return i18n.language === "ar"
          ? "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى"
          : "An unexpected error occurred. Please try again"
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">{getErrorIcon(errorDetails.status)}</div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-gray-800">{getErrorTitle(errorDetails.status)}</CardTitle>
            <CardDescription className="text-lg text-gray-600 max-w-md mx-auto">
              {getErrorDescription(errorDetails.status)}
            </CardDescription>
          </div>

          {errorDetails.status && (
            <Badge variant="outline" className="text-sm">
              {i18n.language === "ar" ? "رمز الخطأ" : "Error Code"}: {errorDetails.status}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleGoBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {i18n.language === "ar" ? "العودة" : "Go Back"}
            </Button>

            <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              {i18n.language === "ar" ? "إعادة المحاولة" : "Try Again"}
            </Button>

            <Button onClick={handleGoHome} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              {i18n.language === "ar" ? "الصفحة الرئيسية" : "Home"}
            </Button>
          </div>

          {/* Error Details Toggle */}
          {errorDetails.message && (
            <div className="border-t pt-4">
              <Button
                variant="ghost"
                onClick={() => setShowDetails(!showDetails)}
                className="w-full text-sm text-gray-500 hover:text-gray-700"
              >
                {showDetails
                  ? i18n.language === "ar"
                    ? "إخفاء التفاصيل"
                    : "Hide Details"
                  : i18n.language === "ar"
                    ? "عرض التفاصيل"
                    : "Show Details"}
              </Button>

              {showDetails && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                  {errorDetails.message && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {i18n.language === "ar" ? "رسالة الخطأ" : "Error Message"}:
                      </p>
                      <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                        {errorDetails.message}
                      </p>
                    </div>
                  )}

                  {errorDetails.stack && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {i18n.language === "ar" ? "تفاصيل التقنية" : "Technical Details"}:
                      </p>
                      <pre className="text-xs text-gray-600 bg-white p-2 rounded border overflow-x-auto max-h-32">
                        {errorDetails.stack}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Help Section */}
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p>
              {i18n.language === "ar"
                ? "إذا استمرت المشكلة، يرجى التواصل مع فريق الدعم"
                : "If the problem persists, please contact our support team"}
            </p>
            <div className="flex justify-center gap-4 text-xs">
              <Link to="/contact" className="text-blue-600 hover:text-blue-800 underline">
                {i18n.language === "ar" ? "اتصل بنا" : "Contact Us"}
              </Link>
              <Link to="/help" className="text-blue-600 hover:text-blue-800 underline">
                {i18n.language === "ar" ? "مساعدة" : "Help"}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
