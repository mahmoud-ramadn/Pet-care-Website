import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"

import { useEffect, useState } from "react"

import i18n from "@/i18n"

export default function ServicesTabs() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.language)
    }

    i18n.on("languageChanged", handleLanguageChange)
    return () => i18n.off("languageChanged", handleLanguageChange)
  }, [])

  // Static content data
  const tabContent = {
    description: {
      en: "Our premium pet grooming service offers a complete spa experience for your furry friends. Each session includes a thorough bath with hypoallergenic shampoo, haircut styling, nail trimming, ear cleaning, and teeth brushing. Our certified groomers use only the highest quality products to ensure your pet's comfort and safety.",
      ar: "تقدم خدمة تصفيف الحيوانات الأليجة الممتازة تجربة سبا كاملة لحيواناتك الأليفة. تشمل كل جلسة حمامًا شاملًا بشامبو هيبوالرجينيك، تصفيف القص، تقليم الأظافر، تنظيف الأذنين، وتنظيف الأسنان. يستخدم مصففونا المعتمدون فقط أعلى المنتجات جودة لضمان راحة وسلامة حيوانك الأليف.",
    },
    reviews: {
      en: [
        {
          name: "Sarah M.",
          rating: 5,
          comment: "My dog always comes back happy and smelling great! The groomers are wonderful with him.",
        },
        {
          name: "Ahmed K.",
          rating: 4,
          comment: "Good service overall, though sometimes the wait can be long during peak hours.",
        },
      ],
      ar: [
        {
          name: "سارة م.",
          rating: 5,
          comment: "كلبى يعود دائمًا سعيدًا ورائحته جميلة! المصممون رائعون معه.",
        },
        {
          name: "أحمد خ.",
          rating: 4,
          comment: "خدمة جيدة بشكل عام، رغم أن الانتظار قد يكون طويلاً في ساعات الذروة.",
        },
      ],
    },
  }

  return (
    <div dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
      <Tabs defaultValue="description" className="w-full max-w-4xl mx-auto">
        <TabsList
          className={`flex ${currentLanguage === "ar" ? "flex-row-reverse" : ""} gap-5 p-1 bg-gray-100 rounded-lg`}
        >
          <TabsTrigger
            value="description"
            className="py-2 px-4 rounded-md text-sm font-medium transition-all
                    data-[state=active]:bg-primary text-gray-700 data-[state=active]:text-white
                    hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {currentLanguage === "ar" ? "الوصف" : "Description"}
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="py-2 px-4 rounded-md text-sm font-medium transition-all
                    data-[state=active]:bg-primary text-gray-700 data-[state=active]:text-white
                    hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {currentLanguage === "ar" ? "التقييمات" : "Reviews"}
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="description" className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 leading-relaxed">{tabContent.description[currentLanguage as "en" | "ar"]}</p>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {tabContent.reviews[currentLanguage as "en" | "ar"].map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <span className="ml-2 font-medium">{review.name}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
