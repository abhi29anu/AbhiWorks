'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

const MASK_HIDDEN =
  'linear-gradient(to bottom, transparent 0%, transparent 100%)';
const MASK_REVEALED = 'linear-gradient(to bottom, black 0%, black 100%)';

function createStripBounds(stripsCount: number) {
  return Array.from({ length: stripsCount }, (_, j) => {
    const posFromBottom = stripsCount - j - 1;
    const step = 100 / stripsCount;
    const lower = (posFromBottom + 1) * step;
    const upper = posFromBottom * step;
    return {
      lower,
      upperGap: upper - 0.1,
      delay: (j / stripsCount) * 0.5,
    };
  });
}

function mergeIntervals(intervals: { top: number; bottom: number }[]) {
  if (!intervals.length) {
    return [];
  }
  intervals.sort((a, b) => a.top - b.top);
  const merged = [{ ...intervals[0] }];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged.at(-1);
    const next = intervals[i];
    if (!last) {
      break;
    }
    if (next.top <= last.bottom) {
      last.bottom = Math.max(last.bottom, next.bottom);
    } else {
      merged.push({ ...next });
    }
  }
  return merged;
}

function buildStripMask(
  stripBounds: ReturnType<typeof createStripBounds>,
  getAdj: (j: number, bounds: (typeof stripBounds)[number]) => number,
) {
  const intervals: { top: number; bottom: number }[] = [];
  for (let j = 0; j < stripBounds.length; j++) {
    const bounds = stripBounds[j];
    const adj = Math.max(0, Math.min(1, getAdj(j, bounds)));
    if (adj <= 0) {
      continue;
    }
    const sliceHeight = bounds.lower - bounds.upperGap;
    intervals.push({
      top: bounds.lower - adj * sliceHeight,
      bottom: bounds.lower,
    });
  }
  const merged = mergeIntervals(intervals);
  if (!merged.length) {
    return MASK_HIDDEN;
  }
  const stops: string[] = [];
  let cursor = 0;
  for (const { top, bottom } of merged) {
    if (top > cursor) {
      stops.push(`transparent ${cursor}%`, `transparent ${top}%`);
    }
    stops.push(`black ${top}%`, `black ${bottom}%`);
    cursor = bottom;
  }
  if (cursor < 100) {
    stops.push(`transparent ${cursor}%`, 'transparent 100%');
  }
  return `linear-gradient(to bottom, ${stops.join(', ')})`;
}

function setMaskImage(el: HTMLElement, value: string) {
  el.style.maskImage = value;
  el.style.webkitMaskImage = value;
}

export interface FlowSectionProps {
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  innerClassName,
  style = {},
  children,
  'aria-label': ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    className={cx(
      'flow-section absolute inset-0 h-full min-h-screen w-full overflow-hidden',
      className,
    )}
    style={{
      willChange: 'transform, mask-image, -webkit-mask-image',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      ...style,
    }}
  >
    <div
      data-flow-inner
      className={cx(
        'flow-art-container relative flex h-full min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]',
        innerClassName,
      )}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  stripsCount?: number;
  scrollPerTransition?: number;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

export const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
  stripsCount = 20,
  scrollPerTransition = 1200,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track || reducedMotion) return;

      const sections = Array.from(
        track.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      const totalSections = sections.length;
      if (totalSections === 0) return;

      const stripRevealSpeed = 2;
      const stripBounds = createStripBounds(stripsCount);
      const scaleFrom = 1.12;
      const scaleTo = 1.0;
      const scaleDiff = scaleFrom - scaleTo;

      // Initialize sections stacking and masks
      sections.forEach((section, i) => {
        gsap.set(section, {
          zIndex: i + 1,
          transformOrigin: 'center center',
          scale: i === 0 ? scaleTo : scaleFrom,
        });

        if (i === 0) {
          setMaskImage(section, MASK_REVEALED);
          section.style.pointerEvents = 'auto';
        } else {
          setMaskImage(section, MASK_HIDDEN);
          section.style.pointerEvents = 'none';
        }
      });

      const transitionCount = totalSections - 1;
      if (transitionCount <= 0) return;

      const totalScrollDistance = transitionCount * scrollPerTransition;

      interface TransitionRange {
        startPercent: number;
        endPercent: number;
      }

      const transitionRanges: TransitionRange[] = [];
      for (let i = 0; i < transitionCount; i++) {
        const start = i * scrollPerTransition;
        const end = (i + 1) * scrollPerTransition;
        transitionRanges.push({
          startPercent: start / totalScrollDistance,
          endPercent: end / totalScrollDistance,
        });
      }

      const handleScrollUpdate = (progress: number) => {
        for (let i = 1; i < totalSections; i++) {
          const section = sections[i];
          const range = transitionRanges[i - 1];
          if (!range) continue;

          if (progress < range.startPercent) {
            // Not reached yet
            setMaskImage(section, MASK_HIDDEN);
            gsap.set(section, { scale: scaleFrom });
            section.style.pointerEvents = 'none';
          } else if (progress > range.endPercent) {
            // Fully revealed
            setMaskImage(section, MASK_REVEALED);
            gsap.set(section, { scale: scaleTo });
            section.style.pointerEvents = 'auto';
          } else {
            // Currently animating with horizontal strip wipe mask
            const localProgress =
              (progress - range.startPercent) /
              (range.endPercent - range.startPercent);

            const maskValue = buildStripMask(stripBounds, (_j, bounds) =>
              Math.max(
                0,
                Math.min(
                  1,
                  (localProgress - bounds.delay) * stripRevealSpeed,
                ),
              ),
            );
            setMaskImage(section, maskValue);

            const currentScale = scaleFrom - scaleDiff * localProgress;
            gsap.set(section, { scale: currentScale });

            section.style.pointerEvents = 'auto';
          }
        }
      };

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${totalScrollDistance}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          handleScrollUpdate(self.progress);
        },
      });

      // Handle resize and refresh
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        if (trigger) {
          handleScrollUpdate(trigger.progress);
        }
      }, 50);

      return () => {
        clearTimeout(refreshTimeout);
        window.removeEventListener('resize', handleResize);
        trigger.kill();
      };
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion, stripsCount, scrollPerTransition] },
  );

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('relative w-full overflow-hidden', className)}
    >
      <div
        ref={trackRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
};

export default FlowArt;
