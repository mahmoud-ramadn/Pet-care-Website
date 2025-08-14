import SwiperWrapper from "../SwiperWrapper"
import SquareNavigation from "../common/squer-nav"

type HeroLayoutType = {
  imageHero: string
  cardUrl?: string
  MainTitle: string
  array?: AdoptionNavigationLink[]
  className?: string
  preview?: number
}

export default function Hero({ imageHero, cardUrl, MainTitle, array, preview }: Readonly<HeroLayoutType>) {
  return (
    <div className="relative h-[800px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105"
        style={{ backgroundImage: `url(${imageHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/20" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-xl md:text-7xl lg:text-8xl">
          {MainTitle}
          <span className="mx-auto mt-4 block h-1 w-24  transition-all duration-500 group-hover:w-32" />
        </h1>

        {array && (
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container 
             mx-auto px-4 pb-8">
              <SwiperWrapper
                preview={preview}
                className="py-4"
               
              >
                {array.map((item) => (
                  <SquareNavigation
                    key={item.id}
                    path={item.path}
                    className={`
                      flex flex-col items-center justify-center gap-6 p-8
                      transition-all duration-300  hover:shadow-xl
                      ${
                        cardUrl === item.path
                          ? "bg-amber-400 ring-2 ring-white ring-offset-4"
                          : "backdrop-blur-sm hover:bg-white"
                      }
                    `}
                   
                    title={item.path}
                    image={item.image}
                  />
                ))}
              </SwiperWrapper>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
