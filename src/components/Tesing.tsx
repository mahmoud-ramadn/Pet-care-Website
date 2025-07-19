import { useTranslation } from "react-i18next"

export default function MyComponent() {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={() => i18n.changeLanguage("ar")}>عربي</button>
      <button onClick={() => i18n.changeLanguage("en")}>English</button>
    </div>
  )
}
