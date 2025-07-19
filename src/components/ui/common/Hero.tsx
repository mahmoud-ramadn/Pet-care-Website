import SwiperWrapper from "../SwiperWrapper"
import SquareNavigation from "../common/squer-nav"

type HeroLayoutType = {
  imageHero: string
  cardUrl: string
  MainTitle: string
  array: AdoptionNavigationLink[]
  className?: string;
  preview?:number
}

export default function Hero({ imageHero, cardUrl, MainTitle, array,className , preview }: Readonly<HeroLayoutType>) {
  return (
    <div
      style={{ backgroundImage: `url(${imageHero})` }}
      className="bg-cover relative bg-center object-cover h-[700px] flex items-center justify-center"
    >
      <h1 className="font-black text-5xl text-center text-white">{MainTitle}</h1>
      <div className="container absolute left-1/2 -bottom-30 -translate-x-1/2">
        <SwiperWrapper preview={preview}>
          {array.map((item) => (
            <SquareNavigation
              key={item.id}
              path={item.path}
              className={`flex items-center justify-center text-white flex-col p-10 gap-10 ${
                cardUrl === item.path ? "bg-amber-400" : `${className}`
              }`}
              title={item.path}
              image={item.image}
            />
          ))}
        </SwiperWrapper>
      </div>
    </div>
  )
}
