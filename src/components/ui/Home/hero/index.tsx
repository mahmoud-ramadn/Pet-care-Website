import blob from "@/assets/images/landing page/blob 1.webp"
import dog from "@/assets/images/landing page/cute-smiley-dog-wearing-sunglasses-removebg-preview 1 (2).webp"
import imageHero from "@/assets/images/landing page/mainbackground.webp"

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-blue-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Content Section */}
            <div className="space-y-8 max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Premium Pet Care Services
              </div>

              {/* Main heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                  Taking Care of Your
                  <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Smart Dog!
                  </span>
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              </div>

              {/* Description */}
              <p className="text-xl text-white/90 leading-relaxed font-light max-w-lg">
                Experience premium products and exceptional services designed specifically for your beloved furry
                companion
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25">
                  <span className="relative z-10">Book Appointment</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/20 hover:border-white/50">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">500+</div>
                  <div className="text-sm text-white/70">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">5★</div>
                  <div className="text-sm text-white/70">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">24/7</div>
                  <div className="text-sm text-white/70">Support</div>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative flex items-center justify-center lg:justify-end">
              {/* Floating elements */}
              <div className="absolute top-10 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute top-32 right-10 w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-500"></div>
              <div className="absolute bottom-20 right-32 w-4 h-4 bg-red-400 rounded-full animate-bounce delay-1000"></div>

              {/* Main image container */}
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>

                {/* Blob background */}
                <div className="relative z-10">
                  <img
                    src={blob}
                    className="w-full max-w-[600px] drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                    alt="blob background"
                  />

                  {/* Dog image */}
                  <img
                    src={dog}
                    alt="Happy dog wearing sunglasses"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[420px] z-20 drop-shadow-2xl group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                {/* Decorative rings */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-white/10 rounded-full animate-spin-slow"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-reverse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  )
}
