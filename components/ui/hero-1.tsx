"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface HeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
}

export function Hero({
  eyebrow = "Innovate Without Limits",
  title,
  subtitle,
  ctaLabel = "Explore Now",
  ctaHref = "#",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full pt-28 md:pt-36 px-6 text-center md:px-8 
      min-h-[calc(100vh-40px)] overflow-hidden 
      bg-[linear-gradient(to_bottom,#fff,#ffffff_50%,#e8e8e8_88%)]  
      dark:bg-[linear-gradient(to_bottom,#000,#000000_30%,#111111_78%,#222222_99%)] 
      rounded-b-xl"
    >
      {/* Grid BG */}
      <div
        className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full 
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
        dark:bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]
        bg-[size:6rem_5rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Radial Accent */}
      <div
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] 
        h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[140%] 
        -translate-x-1/2 rounded-[100%] border-[#B48CDE] bg-white dark:bg-black 
        bg-[radial-gradient(closest-side,#fff_82%,#000000)] 
        dark:bg-[radial-gradient(closest-side,#000_82%,#ffffff)] 
        animate-fade-up pointer-events-none"
      />

      {/* Eyebrow */}
      {eyebrow && (
        <a href={ctaHref} className="group inline-block">
          <span
            className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-manrope-regular mx-auto px-5 py-2 
            bg-gradient-to-tr from-zinc-300/10 via-gray-400/10 to-transparent  
            border border-gray-300/40 dark:border-white/10 
            rounded-3xl w-fit tracking-wider uppercase flex items-center justify-center shadow-sm backdrop-blur-sm"
          >
            {eyebrow}
            <ChevronRight className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
      )}

      {/* Title */}
      <h1
        className="animate-fade-in -translate-y-4 text-balance 
        bg-gradient-to-br from-black from-30% to-black/50 
        bg-clip-text py-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-tight tracking-tighter 
        text-transparent dark:from-white dark:to-white/40"
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-in mb-10 -translate-y-4 text-balance 
        text-base sm:text-lg md:text-xl tracking-normal text-gray-600 dark:text-gray-400 
        max-w-2xl mx-auto font-manrope-regular leading-relaxed"
      >
        {subtitle}
      </p>

      {/* CTA */}
      {ctaLabel && (
        <div className="flex justify-center pb-16">
          <Button
            asChild
            className="w-fit min-w-44 z-20 font-manrope-regular tracking-normal text-center text-base py-3 px-6 rounded-full shadow-lg"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      )}

      {/* Bottom Fade */}
      <div
        className="animate-fade-up relative mt-20 [perspective:2000px] 
        after:absolute after:inset-0 after:z-10 
        after:[background:linear-gradient(to_top,#F5F5F5_10%,transparent)] dark:after:[background:linear-gradient(to_top,#000000_10%,transparent)]"
      />
    </section>
  )
}

export default Hero
