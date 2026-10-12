"use client"

import * as React from "react"
import { motion, useInView } from "motion/react"

import { cn } from "@/lib/utils"

interface BlurRevealProps {
  className?: string
  children: React.ReactNode
  delay?: number
  duration?: number
  style?: React.CSSProperties
  once?: boolean
}

export function BlurReveal({
  className,
  children,
  delay = 0,
  duration = 1,
  style,
  once = false,
}: BlurRevealProps) {
  const spanRef = React.useRef<HTMLSpanElement | null>(null)
  const isInView: boolean = useInView(spanRef, { once, amount: 0.1 })

  return (
    <motion.span
      ref={spanRef}
      initial={{ opacity: 0, filter: "blur(10px)", y: "20%" }}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)", y: "0%" }
          : { opacity: 0, filter: "blur(10px)", y: "20%" }
      }
      transition={
        isInView
          ? { duration: duration, delay: delay, ease: [0.25, 0.1, 0.25, 1] }
          : { duration: 0.2, delay: 0 }
      }
      style={{ wordBreak: "normal", overflowWrap: "normal", ...style }}
      className={cn("inline-block break-normal [word-break:normal] [overflow-wrap:normal]", className)}
    >
      {children}
    </motion.span>
  )
}
