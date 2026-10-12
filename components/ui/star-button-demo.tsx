"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { StarButton } from "@/components/ui/star-button"

export default function StarButtonDemo() {
  const { theme, resolvedTheme } = useTheme()
  const [lightColor, setLightColor] = useState("#FAFAFA")

  useEffect(() => {
    const currentTheme = theme || resolvedTheme
    setLightColor(currentTheme === "dark" ? "#FAFAFA" : "#FF2056")
  }, [theme, resolvedTheme])

  return (
    <div className="flex items-center justify-center p-4">
      <StarButton lightColor={lightColor} className="rounded-3xl">
        Hover me
      </StarButton>
    </div>
  )
}
