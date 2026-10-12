"use client";

import Timeline from "./timeline";
import timelineImg from "@/src/assets/images/regenerated_image_1791653813059.jpg";

const settings = {
  textColor: "currentColor",
  mutedTextColor: "rgba(161, 161, 170, 0.9)",
  activeColor: "#ff5f00",
  backgroundColor: "transparent",
  duration: 1.4,
};

export default function TimelineDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <div className="w-full bg-transparent text-inherit">
      {/* Lead-in for the pinned timeline scroll */}
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h2 className="max-w-[18ch] text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
          How We Work
        </h2>
        <span className="mt-2 animate-bounce opacity-70">&darr;</span>
      </div>

      {/* Realistic usage: custom copy, branded accent, tuned reveal speed */}
      <Timeline
        title="Work Structure"
        periodLabel="Vision - Execution"
        backgroundColor={s.backgroundColor}
        textColor={s.textColor}
        mutedTextColor={s.mutedTextColor}
        activeColor={s.activeColor}
        duration={s.duration}
      />
    </div>
  );
}
