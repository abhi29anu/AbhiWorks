import { useState, useEffect, useRef, useCallback } from "react";
import { Phone } from "lucide-react";
import CinematicOrbitHero from "@/components/ui/cinematic-orbit-hero";
import CinematicThemeSwitcher from "@/components/ui/cinematic-theme-switcher";
import SheenPillButton from "@/components/ui/sheen-pill-button";
import FlowArtDefaultDemo from "@/components/ui/demo";
import TimelineDemo from "@/components/ui/timeline-demo";
import FAQs from "@/components/ui/text-reveal-faqs";
import BlurRevealDemo from "@/components/ui/blur-reveal-demo";
import Testimonial2Demo from "@/components/ui/testimonial-2-demo";
import profilePic from "@/src/assets/images/regenerated_image_1791403033618.jpg";

export default function App() {
  const section2Ref = useRef<HTMLElement>(null);
  const [isHeroDismissed, setIsHeroDismissed] = useState(false);
  const isRestoringRef = useRef(false);

  // Reset scroll position and restore hero on refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Listen to scroll: once user actively scrolls past the hero page into section 2,
  // dismiss the hero so scrolling up normally from other pages will not show it
  useEffect(() => {
    if (isHeroDismissed) return;

    const handleScroll = () => {
      if (isRestoringRef.current) return;

      if (section2Ref.current) {
        const rect = section2Ref.current.getBoundingClientRect();
        // When user has actively scrolled through the hero and section 2 reaches top
        if (window.scrollY > 300 && rect.top <= 20) {
          setIsHeroDismissed(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeroDismissed]);

  // Reset scroll to top cleanly after hero is unmounted
  useEffect(() => {
    if (isHeroDismissed && !isRestoringRef.current) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [isHeroDismissed]);

  // Click on profile picture to immediately restore the previous hero page
  const handleProfileClick = useCallback(() => {
    isRestoringRef.current = true;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    setIsHeroDismissed(false);

    // Keep cooldown until the layout and scroll settle at top
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      isRestoringRef.current = false;
    }, 200);
  }, []);

  // Avatar is visible exclusively when on the second page - rock solid, no flickering
  const showAvatar = isHeroDismissed;

  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] dark:bg-[#000000] text-neutral-900 dark:text-white selection:bg-neutral-900 selection:text-[#F5F5F5] transition-[background-color] duration-700 ease-in-out relative">
      {/* Top-left profile picture: clicking immediately restores the previous hero page */}
      <button
        type="button"
        onClick={handleProfileClick}
        aria-label="Restore previous hero page"
        title="Restore previous page"
        className={`fixed top-5 left-4 md:top-6 md:left-6 z-50 transition-all duration-500 ease-in-out cursor-pointer focus:outline-none ${
          showAvatar
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-4 scale-90 pointer-events-none"
        }`}
      >
        <div className="relative flex h-10 w-10 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-black/10 dark:ring-white/20 shadow-md transition-transform hover:scale-110 active:scale-95 bg-neutral-200 dark:bg-neutral-800">
          <img
            src={profilePic}
            alt="AbhiWorks Profile"
            className="aspect-square h-full w-full object-cover"
            loading="eager"
            decoding="sync"
          />
        </div>
      </button>

      {/* Top-right corner controls: Contact button (visible from next page) & light-dark mode toggle */}
      <div className="fixed top-5 right-4 md:top-6 md:right-6 z-50 flex items-center gap-2 sm:gap-3">
        <div
          className={`transition-all duration-500 ease-in-out ${
            isHeroDismissed
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-4 scale-90 pointer-events-none"
          }`}
        >
          <SheenPillButton
            href="tel:+918247338613"
            width={136}
            height={38}
            title="Contact Us: +91 8247338613"
            aria-label="Contact Us: +91 8247338613"
            className="shadow-sm hover:shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20 shrink-0" />
            <span className="font-semibold text-xs sm:text-sm tracking-tight">Contact Us</span>
          </SheenPillButton>
        </div>
        <CinematicThemeSwitcher />
      </div>

      <main className="w-full">
        {/* Hero page: restored upon profile picture click or page refresh */}
        {!isHeroDismissed && (
          <CinematicOrbitHero onComplete={() => setIsHeroDismissed(true)} />
        )}

        {/* Blur Reveal Section */}
        <section
          ref={section2Ref}
          className="relative w-full min-h-screen flex items-center justify-center bg-[#F5F5F5] dark:bg-[#000000] text-foreground transition-[background-color] duration-700 ease-in-out"
        >
          <BlurRevealDemo />
        </section>

        {/* Story Scroll Flow Art Animation Section */}
        <section
          className="relative w-full min-h-screen bg-[#F5F5F5] dark:bg-[#000000] transition-[background-color] duration-700 ease-in-out"
        >
          {isHeroDismissed && <FlowArtDefaultDemo />}
        </section>

        {/* Timeline Horizontal Story Section */}
        <section
          className="relative w-full min-h-screen bg-[#F5F5F5] dark:bg-[#000000] transition-[background-color] duration-700 ease-in-out"
        >
          {isHeroDismissed && <TimelineDemo />}
        </section>

        {/* FAQs Section */}
        <section
          className="relative w-full min-h-screen flex items-center justify-center bg-[#F5F5F5] dark:bg-[#000000] text-foreground transition-[background-color] duration-700 ease-in-out"
        >
          {isHeroDismissed && <FAQs />}
        </section>

        {/* Testimonial Section with Morph Contact Buttons */}
        <section
          className="relative w-full min-h-screen flex flex-col items-center justify-start pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 bg-[#F5F5F5] dark:bg-[#000000] text-foreground transition-[background-color] duration-700 ease-in-out"
        >
          {isHeroDismissed && <Testimonial2Demo />}
        </section>
      </main>
    </div>
  );
}
