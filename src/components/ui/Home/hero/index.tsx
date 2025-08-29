import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../../button"

// Type definitions
interface MousePosition {
  x: number
  y: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  color: string
}

interface Scene {
  name: string
  bg: string
  accent: string
  description: string
}

const InteractiveShowcase = () => {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [particles, setParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  // Particle system
  const createParticle = useCallback(
    (x: number, y: number): Particle => ({
      id: Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 1,
      size: Math.random() * 8 + 2,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    }),
    []
  )

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Particle animation
  useEffect(() => {
    if (!isPlaying) return

    const animate = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 0.02,
            vy: particle.vy + 0.1,
          }))
          .filter((particle) => particle.life > 0 && particle.y < window.innerHeight + 100)
      )
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  // Auto scene transition
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentScene((prev) => (prev + 1) % 4)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Create particles on click
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newParticles = Array.from({ length: 12 }, () => createParticle(x, y))
    setParticles((prev) => [...prev, ...newParticles])
  }

  const scenes: Scene[] = [
    {
      name: t("hero.scene1.name"),
      bg: "from-purple-900 via-blue-900 to-indigo-900",
      accent: "from-cyan-400 to-purple-500",
      description: t("hero.scene1.description"),
    },
    {
      name: t("hero.scene2.name"),
      bg: "from-indigo-900 via-purple-900 to-pink-900",
      accent: "from-pink-400 to-orange-500",
      description: t("hero.scene2.description"),
    },
    {
      name: t("hero.scene3.name"),
      bg: "from-blue-900 via-teal-900 to-cyan-900",
      accent: "from-emerald-400 to-blue-500",
      description: t("hero.scene3.description"),
    },
    {
      name: t("hero.scene4.name"),
      bg: "from-green-900 via-emerald-900 to-teal-900",
      accent: "from-yellow-400 to-green-500",
      description: t("hero.scene4.description"),
    },
  ]

  const currentSceneData = scenes[currentScene]

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative min-h-screen  overflow-hidden cursor-crosshair transition-all duration-2000 bg-gradient-to-br ${currentSceneData.bg}`}
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%),
          linear-gradient(135deg, var(--tw-gradient-stops))
        `,
      }}
    >
      <div className="absolute inset-0">
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
          }}
        />

        {/* Flowing orbs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-64 h-64 bg-gradient-to-br ${currentSceneData.accent} rounded-full blur-3xl opacity-30 animate-pulse`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              transform: `translate(${mousePosition.x * (0.02 + i * 0.01)}px, ${mousePosition.y * (0.02 + i * 0.01)}px)`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.life,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              transform: `scale(${particle.life})`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen bg-blue-950/20   flex items-center justify-center p-8">
        <div className="text-center max-w-4xl">
          {/* Main title with morphing effect */}
          <div className="relative mb-8">
            <h1
              className={`text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r ${currentSceneData.accent} bg-clip-text mb-4 transition-all duration-1000`}
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1 - 5}deg) rotateY(${mousePosition.x * 0.1 - 5}deg)`,
              }}
            >
              {currentSceneData.name}
            </h1>
            <div
              className={`h-2 bg-gradient-to-r ${currentSceneData.accent} mx-auto transition-all duration-1000`}
              style={{ width: `${50 + mousePosition.x * 0.5}%` }}
            />
          </div>

          {/* Description */}
          <p className="text-2xl  dark:text-white text-blue-950 mb-12 font-medium tracking-wide">{currentSceneData.description}</p>

          {/* Interactive controls */}
          <div className="flex flex-wrap gap-6 justify-center mb-12">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-8 py-4 bg-gradient-to-r ${currentSceneData.accent} text-white font-bold rounded-full hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl`}
            >
              {isPlaying ? t("hero.controls.pause") : t("hero.controls.play")}
            </Button>

            <Button
              onClick={() => setCurrentScene((prev) => (prev + 1) % scenes.length)}
              className="px-8 py-4  backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-full transition-all duration-300"
            >
              {t("hero.controls.nextScene")}
            </Button>
          </div>

       

        </div>
      </div>

    

     

      {/* CSS for additional animations */}
      <style>{`
        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default InteractiveShowcase
