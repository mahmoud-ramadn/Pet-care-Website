import SwiperWrapper from "../SwiperWrapper"
import SquareNavigation from "../common/squer-nav"

type AdoptionNavigationLink = {
  id: string
  path: string
  image: string
}

type HeroLayoutType = {
  imageHero: string
  cardUrl?: string
  MainTitle: string
  array?: AdoptionNavigationLink[]
  className?: string
  preview?: number
}

export default function Hero({ imageHero, cardUrl, MainTitle, array, className = "", preview = 3 }: HeroLayoutType) {
  return (
    <section className="relative">
      <img src={imageHero} alt="preload hero" style={{ display: "none" }} loading="eager" />

      <div
        className="hero-bg h-[700px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${imageHero})` }}
      >
        <h1 className="font-black text-5xl text-center text-white">{MainTitle}</h1>
      </div>

      {array && array.length > 0 && (
        <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-full px-4">
          <SwiperWrapper preview={preview}>
            {array.map((item) => (
              <SquareNavigation
                key={item.id}
                path={item.path}
                className={`flex items-center justify-center text-white flex-col p-10 gap-10 ${
                  cardUrl === item.path ? "bg-amber-400" : className
                }`}
                title={item.path}
                image={item.image}
              />
            ))}
          </SwiperWrapper>
        </div>
      )}
    </section>
  )
}
