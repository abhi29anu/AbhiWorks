// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. A callback may return its own
   cleanup, which runs before the next re-add and on unmount. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
} as const;

type Month = keyof typeof monthOrder;

type JourneyItem = {
  id: string;
  year: string;
  month: Month;
  title?: string;
  content: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SplitTextInstance = any;

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Reveal animation duration, in seconds. */
  duration?: number;
  /** Fallback reveal duration when `duration` is omitted, in seconds. */
  scrollDuration?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

const topJourneyData: JourneyItem[] = [
  {
    id: "2020-march",
    year: "2020",
    month: "March",
    title: "Understanding Your Vision",
    content: "We learn about your business, goals, and ideas to understand exactly what you need.",
  },
  {
    id: "2021-july",
    year: "2021",
    month: "July",
    title: "Design & Development",
    content: "We turn your ideas into websites, apps, designs, campaigns, or automation systems.",
  },
  {
    id: "2023-april",
    year: "2023",
    month: "April",
    title: "Launch & Deployment",
    content: "We test everything and launch your project, making sure it is ready for your audience.",
  },
];

const bottomJourneyData: JourneyItem[] = [
  {
    id: "2020-november",
    year: "2020",
    month: "November",
    title: "Planning & Strategy",
    content: "We create a clear project plan with the right solutions, timeline, and deliverables.",
  },
  {
    id: "2022-october",
    year: "2022",
    month: "October",
    title: "Demo & Approval",
    content: "We present the work, gather your feedback, and refine it until the agreed requirements are met.",
  },
  {
    id: "2025-september",
    year: "2025",
    month: "September",
    title: "Support & Growth",
    content: "We provide agreed support, maintenance, and improvements to help your business keep moving forward.",
  },
];

const allJourneyItems: JourneyItem[] = [
  ...topJourneyData,
  ...bottomJourneyData,
].sort((a, b) => {
  const yearDiff = Number(a.year) - Number(b.year);
  if (yearDiff !== 0) return yearDiff;
  return monthOrder[a.month] - monthOrder[b.month];
});

export default function Timeline({
  title = "Work Structure",
  periodLabel = "Vision - Execution",
  textColor = "inherit",
  mutedTextColor = "#888888",
  activeColor = "#ff5f00",
  backgroundColor = "transparent",
  imageUrl = "https://cdn.21st.dev/assets/mirror/b0/b0c41784074f76ac5fb6b447da87780c901135841317a096241371f24bc13ddd.jpg",
  imageAlt = "Modern office workspace",
  duration,
  scrollDuration = 1.2,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);
  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const isMobile = window.innerWidth < 600;
    const slidePercent = isMobile ? -71 : -44;
    const lineWidth = "100%";
    const lineStart = isMobile ? "top 25%" : "top 20%";
    const slideEnd = isMobile ? "78% 50%" : "82% bottom";
    const lineEnd = isMobile ? "78% 50%" : "82% bottom";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: slideEnd,
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });

    tl.fromTo(
      wholeSliderRef.current,
      { xPercent: 0 },
      { xPercent: slidePercent },
    );

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }

    gsap.to(".journey-line", {
      width: lineWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: lineStart,
        end: lineEnd,
        scrub: true,
      },
    });
  }, { dependencies: [reducedMotion], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const items = allJourneyItems;

    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, y: 0 });
        gsap.set(`.description-${item.id}`, { opacity: 1, y: 0 });
      });
      return;
    }

    // Set initial state for all items: connector line collapsed, dot hidden, text completely hidden
    items.forEach((item) => {
      const isTop = topJourneyData.some((topItem) => topItem.id === item.id);
      gsap.set(`.jl-${item.id}`, {
        scaleY: 0,
        transformOrigin: isTop ? "bottom bottom" : "top top",
      });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.title-${item.id}`, { opacity: 0, y: isTop ? -20 : 20 });
      gsap.set(`.description-${item.id}`, { opacity: 0, y: isTop ? -20 : 20 });
    });

    const isMobile = window.innerWidth < 600;

    const createItemTimeline = (
      item: JourneyItem,
      startPos: number,
      endPos: number,
    ) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleSelector = `.title-${item.id}`;
      const descSelector = `.description-${item.id}`;
      const isTop = topJourneyData.some((topItem) => topItem.id === item.id);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `${startPos}% 30%`,
          end: `${endPos}% 50%`,
          scrub: true,
        },
      });

      if (isMobile) {
        // MOBILE ONLY: 
        const isLast = item.id === allJourneyItems[allJourneyItems.length - 1].id;

        timeline
          .to(lineSelector, {
            scaleY: 1,
            duration: isLast ? 0.1 : 0.15,
            ease: "none",
          })
          .to(
            dotSelector,
            {
              scale: 1,
              duration: isLast ? 0.08 : 0.1,
              ease: "none",
            },
            "-=0.05",
          )
          .fromTo(
            titleSelector,
            { opacity: 0, y: isTop ? -18 : 18 },
            {
              opacity: 1,
              y: 0,
              duration: isLast ? 0.12 : 0.18,
              ease: "power2.out",
            },
            "+=0.02",
          )
          .fromTo(
            descSelector,
            { opacity: 0, y: isTop ? -18 : 18 },
            {
              opacity: 1,
              y: 0,
              duration: isLast ? 0.12 : 0.18,
              ease: "power2.out",
            },
            "-=0.1",
          )
          .to({}, { duration: isLast ? 0.85 : 0.65 }); // Hold settled and fully readable while the slider moves
      } else {
        // DESKTOP: Standard smooth scrub sequence
        timeline
          .to(lineSelector, {
            scaleY: 1,
            duration: 0.35,
            ease: "none",
          })
          .to(
            dotSelector,
            {
              scale: 1,
              duration: 0.25,
              ease: "none",
            },
            "-=0.1",
          )
          .fromTo(
            titleSelector,
            { opacity: 0, y: isTop ? -20 : 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
            },
            "+=0.05",
          )
          .fromTo(
            descSelector,
            { opacity: 0, y: isTop ? -20 : 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
            },
            "-=0.25",
          );
      }

      return timeline;
    };

    // Sequential activation ranges for chronological items 0 to 5
    const positions: ReadonlyArray<readonly [number, number]> =
      isMobile
        ? [
            [6, 20],
            [18, 32],
            [30, 44],
            [42, 56],
            [52, 66],
            [58, 78],
          ]
        : [
            [8, 20],
            [20, 32],
            [32, 44],
            [44, 56],
            [56, 68],
            [68, 80],
          ];

    items.forEach((item, index) => {
      const [startPos, endPos] = positions[index] || [50, 65];
      createItemTimeline(item, startPos, endPos);
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [normalizedDuration, reducedMotion], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="h-[140vw] max-[600px]:h-[300vh] w-full relative"
      style={sectionStyle}
    >
      <div className="h-screen w-screen sticky top-[0%] pt-[10%] overflow-hidden max-[600px]:top-[5%] max-[600px]:translate-x-3.5 max-[600px]:pl-[2vw]">
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[30vw] w-[175vw] items-center gap-[5vw] px-[5vw] max-[600px]:h-[50vh] max-[600px]:w-[420vw] max-[600px]:px-[4vw] max-[600px]:gap-[3.5vw] max-[600px]:scale-[0.8] max-[600px]:origin-left"
        >
          <div className="relative h-full w-full">
            <div className="w-[170vw] max-[600px]:w-[415vw] absolute left-0 top-[49%] tranlate-y-[-50%] flex items-center h-fit">
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full"
                style={activeStyle}
              ></div>
              <div
                className="h-px w-[0%] rounded-full journey-line"
                style={activeStyle}
              ></div>
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full"
                style={activeStyle}
              ></div>
            </div>

            <div className="flex h-1/2 w-full items-center justify-start gap-[.5vw]">
              <div className="h-full w-[20%] pt-[2vw] max-[600px]:h-fit max-[600px]:pt-[5vw]">
                <h2 className="w-[65%] text-2xl sm:text-4xl md:text-5xl leading-[0.95] font-bold">
                  {title}
                </h2>
              </div>

              <div className="w-full flex h-full gap-x-[15vw] max-[600px]:gap-x-[40vw]">
                {topJourneyData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[30vw] px-[3vw] max-[600px]:flex max-[600px]:w-[70vw] max-[600px]:flex-col max-[600px]:px-[7vw]"
                  >
                    <div className="w-full absolute left-0 bottom-0 top-0 h-full">
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] translate-x-[-50%] relative aspect-square rounded-full jd-${item.id}`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`h-[94%] w-px origin-bottom rounded-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                    </div>

                    <div className="mt-[-1vw] space-y-[1vw] max-[600px]:mt-[-2vw]">
                      <h3
                        className={`title-${item.id} opacity-0 ${
                          item.title
                            ? "text-base sm:text-lg md:text-xl"
                            : "text-lg sm:text-xl md:text-2xl"
                        } leading-tight font-semibold`}
                      >
                        {item.title || `${item.year} ${item.month}`}
                      </h3>
                      <p
                        className={`description-${item.id} opacity-0 w-[90%] text-sm sm:text-base leading-[1.15] max-[600px]:w-[90%]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-1/2 flex items-center justify-start w-full">
              <div className="w-[34%] pt-[2vw] max-[600px]:pt-[5vw] max-[600px]:w-[30%] h-full">
                <p
                  className="text-sm sm:text-base leading-none font-mono"
                  style={mutedTextStyle}
                >
                  {periodLabel}
                </p>
              </div>

              <div className="w-full flex h-full gap-x-[20vw] ml-[7vw] max-[600px]:gap-x-[40vw] max-[600px]:ml-[7vw]">
                {bottomJourneyData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[25vw] px-[3vw] max-[600px]:w-[70vw] max-[600px]:px-[7vw]"
                  >
                    <div className="w-full absolute left-0 bottom-[-1%] h-full">
                      <div
                        className={`h-[94%] origin-top w-px rounded-full max-[600px]:h-full jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.5vw] translate-x-[-50%] relative w-auto aspect-square rounded-full jd-${item.id}`}
                        style={activeStyle}
                      ></div>
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-[1vw]">
                      <h3
                        className={`title-${item.id} opacity-0 ${
                          item.title
                            ? "text-base sm:text-lg md:text-xl"
                            : "text-lg sm:text-xl md:text-2xl"
                        } leading-tight font-semibold`}
                      >
                        {item.title || `${item.year} ${item.month}`}
                      </h3>
                      <p
                        className={`description-${item.id} opacity-0 w-[90%] text-sm sm:text-base leading-[1.15] max-[600px]:w-[90%]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
