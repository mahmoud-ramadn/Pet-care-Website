import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme") as Theme | null
    if (stored === "light" || stored === "dark") return stored
  } catch (error) {
    void error
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  return "light"
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

type Props = { children: React.ReactNode }

export function ThemeProvider({ children }: Readonly<Props>) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem("theme", theme)
    } catch (error) {
      void error
    }
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const listener = () => {
      try {
        const stored = localStorage.getItem("theme") as Theme | null
        if (!stored) setThemeState(media.matches ? "dark" : "light")
      } catch (error) {
        void error
      }
    }
    media.addEventListener?.("change", listener)
    return () => media.removeEventListener?.("change", listener)
  }, [])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggleTheme = useCallback(() => setThemeState((prev) => (prev === "dark" ? "light" : "dark")), [])

  const value = useMemo<ThemeContextValue>(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
