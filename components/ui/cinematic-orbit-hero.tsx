"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  animate,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import imgNth2 from "@/src/assets/images/regenerated_image_1791399579016.jpg";
import imgNth3 from "@/src/assets/images/regenerated_image_1791399577706.jpg";
import imgNth4 from "@/src/assets/images/regenerated_image_1791399580450.jpg";
import imgNth5 from "@/src/assets/images/regenerated_image_1791400881326.jpg";
import imgNth6 from "@/src/assets/images/regenerated_image_1791399391828.jpg";
import imgNth7 from "@/src/assets/images/regenerated_image_1791399390608.jpg";
import imgNth8 from "@/src/assets/images/regenerated_image_1791399392755.jpg";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f4?auto=format&fit=crop&w=800&q=80",
    alt: "Aviation and sky",
  },
  {
    src: imgNth2,
    alt: "Showcase visual 2",
  },
  {
    src: imgNth3,
    alt: "Showcase visual 3",
  },
  {
    src: imgNth4,
    alt: "Showcase visual 4",
  },
  {
    src: imgNth5,
    alt: "Showcase visual 5",
  },
  {
    src: imgNth6,
    alt: "Showcase visual 6",
  },
  {
    src: imgNth7,
    alt: "Showcase visual 7",
  },
  {
    src: imgNth8,
    alt: "Showcase visual 8",
  },
];

const TOTAL_CARDS = IMAGES.length;

const generateInitialCards = () => {
  return IMAGES.map((item, i) => {
    return {
      item,
      hideCard: i === 0,
      hideImage: i === 0,
      hideOverlay: i === 0,
      linearOffset: { x: (i - TOTAL_CARDS / 2) * 4, y: (i - TOTAL_CARDS / 2) * 3 },
      linearRotate: (i - TOTAL_CARDS / 2) * 3,
    };
  });
};

const CARDS = generateInitialCards();

const SPRING_CONFIG = { stiffness: 45, damping: 25, mass: 1 };
const PROGRESS_SPRING = { stiffness: 50, damping: 26, mass: 0.8, restDelta: 0.0005 };

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled || !active) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

interface CardProps {
  card: (typeof CARDS)[0];
  index: number;
  rotationAngle: any;
  progress: any;
  pointer: { x: any; y: any };
  isMobile: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function Card({
  card,
  index,
  rotationAngle,
  progress,
  pointer,
  isMobile,
  onHoverStart,
  onHoverEnd,
}: CardProps) {
  if (card.hideCard) {
    return <motion.div className="hidden" aria-hidden="true" />;
  }

  const { item, hideImage, hideOverlay, linearOffset, linearRotate } = card;
  const baseAngle = (index * (Math.PI * 2)) / TOTAL_CARDS;
  const widthVw = isMobile ? 32 : 15;
  const heightVh = isMobile ? 24 : 22;

  // Real-time automatic 3D orbit translation
  const translate = useTransform(
    [rotationAngle, progress, pointer.x, pointer.y],
    ([rot, p, px, py]: number[]) => {
      const currentAngle = baseAngle + rot;
      const radiusX = isMobile ? 42 * 0.7 : 42;
      const radiusY = isMobile ? 15 * 1.5 : 15;
      const yOffset = isMobile ? 10 : 8;

      const targetX = Math.cos(currentAngle - Math.PI / 2) * radiusX;
      const targetY = Math.sin(currentAngle - Math.PI / 2) * radiusY + yOffset;

      const easeP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      const curX = linearOffset.x + (targetX - linearOffset.x) * easeP;
      const curY = linearOffset.y + (targetY - linearOffset.y) * easeP;

      const depthScale = Math.sin(currentAngle - Math.PI / 2);
      const depthFactor = 0.2 + ((depthScale + 1) * 0.45);
      const dx = curX - px * 5 * depthFactor * easeP;
      const dy = curY - py * 5 * depthFactor * easeP;

      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    }
  );

  // Real-time scale based on depth & bloom progress
  const scale = useTransform(
    [rotationAngle, progress],
    ([rot, p]: number[]) => {
      const currentAngle = baseAngle + rot;
      const depthScale = Math.sin(currentAngle - Math.PI / 2);
      const targetScale = 0.8 + depthScale * 0.25;
      const easeP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      return 0.6 + (targetScale - 0.6) * easeP;
    }
  );

  // Dynamic outward-leaning rotation as card orbits
  const rotate = useTransform(
    [rotationAngle, progress],
    ([rot, p]: number[]) => {
      const currentAngle = baseAngle + rot;
      const targetRotate = Math.cos(currentAngle - Math.PI / 2) * 15;
      const easeP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      return linearRotate + (targetRotate - linearRotate) * easeP;
    }
  );

  // Dynamic z-index: front cards naturally appear above back cards
  const zIndex = useTransform(
    rotationAngle,
    (rot: number) => {
      const currentAngle = baseAngle + rot;
      const depthScale = Math.sin(currentAngle - Math.PI / 2);
      return Math.round((depthScale + 1) * 100);
    }
  );

  // Gentle levitation float
  const floatDuration = 4.2 + ((index * 3) % 4) * 0.7;
  const floatDelay = ((index * 2) % 6) * 0.35;
  const floatDistance = 4 + (index % 4);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform cursor-pointer"
      style={{
        width: `${widthVw}vw`,
        height: `${heightVh}vh`,
        zIndex,
        translate,
        rotate,
        scale,
      }}
      whileHover={{
        scale: 1.18,
        zIndex: 999,
        transition: SPRING_CONFIG,
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <motion.div
        animate={{
          y: [-floatDistance, floatDistance, -floatDistance],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl shadow-black/10 ring-1 ring-black/5 dark:shadow-black/50 dark:ring-white/20 transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/30 dark:hover:shadow-black/80 bg-neutral-800 will-change-transform"
      >
        {!hideOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5 dark:to-white/10 opacity-70 z-10 pointer-events-none" />
        )}
        {!hideImage && item.src && (
          <img
            src={item.src}
            alt={item.alt}
            draggable={false}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105 select-none"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export interface CinematicOrbitHeroProps {
  onComplete?: () => void;
}

export default function CinematicOrbitHero({ onComplete }: CinematicOrbitHeroProps = {}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatic orbital rotation angle driven continuously via requestAnimationFrame
  const rotationAngle = useMotionValue(0);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      // Normal rotation speed ~0.16 rad/s (approx 1 full revolution every 39s); slows gently on hover
      const speed = isHoveredRef.current ? 0.03 : 0.16;
      rotationAngle.set(rotationAngle.get() + speed * dt);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [rotationAngle]);

  // Automatic bloom/reveal on page load; redirects to next page after animation
  const bloomProgress = useMotionValue(0);

  useEffect(() => {
    let redirectTimer: ReturnType<typeof setTimeout>;
    let fadeTimer: ReturnType<typeof setTimeout>;

    const controls = animate(bloomProgress, 1, {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1], // Smooth velvet ease-out
      onComplete: () => {
        // After bloom animation completes, pause briefly so user sees the cards settle, then transition smoothly to next page
        redirectTimer = setTimeout(() => {
          setIsRedirecting(true);
          fadeTimer = setTimeout(() => {
            onComplete?.();
          }, 600);
        }, 800);
      },
    });

    return () => {
      controls.stop();
      clearTimeout(redirectTimer);
      clearTimeout(fadeTimer);
    };
  }, [bloomProgress, onComplete]);

  // Scroll tracking to dismiss hero or accelerate expansion on scroll
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const smoothScrollProgress = useSpring(scrollYProgress, PROGRESS_SPRING);

  // Combine auto-bloom with manual scroll (whichever is greater)
  const progress = useTransform(
    [bloomProgress, smoothScrollProgress],
    ([b, s]: number[]) => Math.min(1, Math.max(b, s))
  );

  const pointer = usePointerParallax(true, !reduce);
  const textScale = useTransform(progress, [0, 1], [0.85, 1], { clamp: true });
  const textOpacity = useTransform(progress, [0.1, 0.7], [0, 1], { clamp: true });
  const buttonOpacity = useTransform(smoothScrollProgress, [0, 0.25], [1, 0], { clamp: true });
  const buttonScale = useTransform(smoothScrollProgress, [0, 0.25], [1, 0.9], { clamp: true });

  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 1.5, behavior: "smooth" });
  };

  return (
    <section
      ref={wrapRef}
      className={`relative w-full h-[350vh] bg-[#F5F5F5] dark:bg-[#000000] text-neutral-900 dark:text-white transition-all duration-700 ease-in-out ${
        isRedirecting ? "opacity-0 scale-[0.98] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">
        
        <motion.div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-60 dark:opacity-30 blur-[100px] md:blur-[120px]" style={{ scale: textScale }}>
          <div className="w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] rounded-full bg-rose-300/40 dark:bg-rose-500/20 mix-blend-multiply dark:mix-blend-screen" />
        </motion.div>

        <motion.div className="pointer-events-none z-20 flex flex-col items-center text-center px-6 absolute top-24 sm:top-28 left-0 right-0 w-full md:relative md:top-auto md:mt-2 lg:mt-4" style={{ opacity: textOpacity, scale: textScale }}>
          <h2
            style={{ fontFamily: "'Always Classy', 'AlwaysClassy', serif" }}
            className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide text-neutral-900 dark:text-white font-always-classy"
          >
            AbhiWorks
          </h2>
          <p className="mt-2 md:mt-3 max-w-[55ch] text-xs md:text-sm text-neutral-600 dark:text-neutral-300 font-hubot-sans font-normal tracking-wide leading-relaxed">
            Build . Automate . Grow .
          </p>
        </motion.div>

        <div className="absolute inset-0 z-10 bg-[#F5F5F5] dark:bg-[#000000] transition-[background-color] duration-700">
          {CARDS.map((card, i) => (
            <Card
              key={i}
              card={card}
              index={i}
              rotationAngle={rotationAngle}
              progress={progress}
              pointer={pointer}
              isMobile={isMobile}
              onHoverStart={() => { isHoveredRef.current = true; }}
              onHoverEnd={() => { isHoveredRef.current = false; }}
            />
          ))}
        </div>

        {/* Scroll text prompt placed at bottom-center */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto cursor-pointer"
          style={{ opacity: buttonOpacity, scale: buttonScale }}
          onClick={handleScrollDown}
        >
          <span className="font-manrope-regular text-xs md:text-sm tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors select-none inline-flex items-center gap-1">
            Scroll ↓ 
          </span>
        </motion.div>
      </div>
    </section>
  );
}
