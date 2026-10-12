import { BlurReveal } from "@/components/ui/blur-reveal"
import { HighlightText } from "@/components/ui/highlight-text"

export default function BlurRevealDemo() {
  return (
    <div className="flex max-w-4xl w-full flex-col items-center justify-center text-center space-y-4 px-4 sm:px-6">
      <div className="flex items-center justify-center">
        <span
          style={{ fontFamily: "'Always Classy', 'AlwaysClassy', serif" }}
          className="font-always-classy text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide text-neutral-900 dark:text-white"
        >
          <BlurReveal
            delay={0}
            style={{ fontFamily: "'Always Classy', 'AlwaysClassy', serif" }}
            className="font-always-classy text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            AbhiWorks
          </BlurReveal>
        </span>
      </div>

      <div className="flex items-center justify-center">
        <BlurReveal delay={0.4} className="text-neutral-600 dark:text-neutral-400 text-[9px] min-[360px]:text-[10px] min-[400px]:text-[11px] sm:text-base md:text-lg font-normal leading-snug sm:leading-relaxed max-w-4xl break-normal [word-break:normal] [overflow-wrap:normal] [hyphens:none]">
          <span
            style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none", whiteSpace: "nowrap" }}
            className="block whitespace-nowrap break-normal [word-break:normal] [overflow-wrap:normal] [hyphens:none] text-[9px] min-[360px]:text-[10px] min-[400px]:text-[11px] sm:text-base md:text-lg"
          >
            We build powerful{" "}
            <HighlightText variant="lime">Digital Experiences</HighlightText>, create{" "}
            <HighlightText variant="yellow">Brands</HighlightText> that stand out,
          </span>
          <span
            style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none", whiteSpace: "nowrap" }}
            className="block whitespace-nowrap break-normal [word-break:normal] [overflow-wrap:normal] [hyphens:none] text-[9px] min-[360px]:text-[10px] min-[400px]:text-[11px] sm:text-base md:text-lg"
          >
            and <HighlightText variant="cyan">Automate Growth</HighlightText> to move your business{" "}
            <HighlightText variant="pink">Forward</HighlightText>.
          </span>
        </BlurReveal>
      </div>
    </div>
  )
}
