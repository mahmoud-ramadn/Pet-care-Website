import { FacebookIcon, InstagramIcon, XIcon } from "lucide-react"

import { useTranslation } from "react-i18next"

import { contactLinks } from "@/Constants/main"

import { Input } from "../ui/input"

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="bg-primary   md:pt-20 pt-10">
      <div className=" flex flex-wrap justify-between container    gap-x-5 gap-y-6 md:pb-16 pb-8">
        <div className="  max-w-[400px] w-full">
          <h3 className=" font-medium  text-white text-2xl">{t("footer.getInTouch")}</h3>
          <Input
            type="search"
            className=" border mt-5 border-white pl-6   placeholder:text-yellow-300   focus:outline-4  text-white "
            placeholder={t("footer.emailPlaceholder")}
          />
          <div className=" flex   text-white  items-center gap-x-5 mt-5">
            <FacebookIcon className=" size-7 " />
            <XIcon className=" size-7 " />
            <InstagramIcon className=" size-7 " />
          </div>
        </div>
        <div>
          <h3 className=" font-medium text-white text-2xl pb-3">{t("contacts")}</h3>
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="flex items-center  py-2 gap-x-4 text-white hover:underline"
            >
              {link.icon()}
              <span>{link.text}</span>
            </a>
          ))}
        </div>
        <div className=" flex flex-col">
          <h3 className=" font-medium text-white text-2xl">{t("footer.terms")}</h3>
          {(t("footer.termsList", { returnObjects: true }) as string[]).map((item, index) => (
            <a key={index} href="/" className="flex items-center py-2 gap-x-4 text-white hover:underline">
              {item}
            </a>
          ))}
        </div>
      </div>
      <p className=" border-t border-white pt-4 pb-5 text-center  font-medium  text-white">{t("footer.rights")}</p>
    </footer>
  )
}
