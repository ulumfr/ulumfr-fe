"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by waiting for mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-9 rounded-md border border-transparent bg-transparent cursor-pointer"
        disabled
      >
        <div className="size-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = theme === "dark"

  const handleToggle = () => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("theme-transitioning");
      setTheme(isDark ? "light" : "dark");
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 700);
    } else {
      setTheme(isDark ? "light" : "dark");
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="size-9 rounded-md border border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="size-[1.2rem] text-yellow-500 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="size-[1.2rem] transition-transform duration-300 hover:-rotate-12" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
