import { Outlet } from "react-router"

import authImg from "@/assets/images/background/auth.jpg"

export default function AuthLayout() {
  return (
    <div className="flex md:flex-row flex-col h-dvh bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Image Section with Enhanced Styling */}
      <div className="w-full md:h-full sm:h-full h-fit md:basis-1/2 overflow-hidden relative group">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 group-hover:from-black/50 transition-all duration-700"></div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 z-20 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-lg animate-float-delayed"></div>
        </div>

        <img
          className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          src={authImg}
          alt="auth"
        />

        {/* Decorative Text Overlay */}
        <div className="absolute bottom-8 left-8 z-30 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 opacity-90">Welcome Back</h2>
          <p className="text-sm md:text-base opacity-75">Sign in to continue your journey</p>
        </div>
      </div>

      {/* Main Content Section */}
      <main className="md:basis-1/2 h-full flex relative items-center w-full justify-center p-6 md:p-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-purple-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/5 to-pink-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Glassmorphism Container */}
        <div className="absolute inset-4 md:inset-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50"></div>

        {/* Enhanced Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[5%] z-10">
          <div className="relative group">
            {/* Logo Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 border border-white/50 dark:border-slate-600/50 shadow-lg">
              <img
                className="size-14 transform group-hover:scale-110 transition-transform duration-300"
                src="/logo.webp"
                alt="logo"
              />
            </div>
          </div>
        </div>

        {/* Content Area with Animation */}
        <div className="relative z-10 w-full max-w-md mx-auto transform animate-fade-in-up">
          <Outlet />
        </div>

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>

        {/* Corner Decorative Elements */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-sm animate-pulse delay-500"></div>
      </main>

    </div>
  )
}
