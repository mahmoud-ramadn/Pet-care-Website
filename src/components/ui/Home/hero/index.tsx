import blob from "@/assets/images/landing page/blob 1.webp"
import dog from "@/assets/images/landing page/cute-smiley-dog-wearing-sunglasses-removebg-preview 1 (2).webp"
import imageHero from "@/assets/images/landing page/mainbackground.webp"

export default function Hero() {
  return (
    <div
      className="container bg-cover bg-center md:flex-row flex-col  justify-center  gap-x-5 flex items-center py-12 px-4"
      style={{ backgroundImage: `url(${imageHero})` }}
    >
      <div className="md:w-1/3 p-10 ">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Taking care of your Smart Dog!</h1>
        <p className="text-xl text-primary mb-8">Premium products and services for your furry friend</p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-full transition duration-300">
          Book Now
        </button>
      </div>

      <div className="relative flex items-center justify-center  mt-10 md:mt-0">
        <img src={blob} className="w-full max-w-[556px] overflow-hidden" alt="blob background" />
        <img src={dog} alt="Happy dog wearing sunglasses" className="w-full max-w-[384px] absolute z-10 bottom-0" />
      </div>
    </div>
  )
}
