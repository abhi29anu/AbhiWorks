"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { photos, type Photo } from "@/components/ui/gallery-4";

export function FloatingGalleryPreview() {
  const [active, setActive] = React.useState<Photo | null>(null);

  const floatConfigs = [
    { y: [-5, 6, -4], x: [-3, 4, -2], rotate: [-2, 2.5, -1.5], duration: 4.4, delay: 0 },
    { y: [7, -6, 5], x: [4, -5, 3], rotate: [2.5, -2, 2], duration: 5.2, delay: 0.4 },
    { y: [-7, 5, -6], x: [-4, 5, -3], rotate: [-2, 3, -1], duration: 4.1, delay: 0.8 },
    { y: [6, -7, 6], x: [3, -4, 4], rotate: [2, -2.5, 1.5], duration: 5.6, delay: 0.2 },
    { y: [-6, 7, -5], x: [-4, 3, -3], rotate: [-2.5, 2, -2], duration: 4.8, delay: 0.6 },
  ];

  return (
    <div className="mt-3 sm:mt-4 md:mt-5 w-full max-w-4xl z-20">
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 md:gap-4 py-2">
        {photos.map((photo, index) => {
          const cfg = floatConfigs[index % floatConfigs.length];
          return (
            <motion.div
              key={photo.id}
              animate={{
                y: cfg.y,
                x: cfg.x,
                rotate: cfg.rotate,
              }}
              transition={{
                duration: cfg.duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: cfg.delay,
              }}
              whileHover={{
                scale: 1.12,
                rotate: 0,
                zIndex: 40,
                transition: { duration: 0.2 },
              }}
              className="relative cursor-pointer group"
              onClick={() => setActive(photo)}
            >
              <div className="relative w-18 h-15 sm:w-24 sm:h-18 md:w-28 md:h-22 rounded-xl sm:rounded-2xl overflow-hidden border border-white/60 shadow-[0_0_18px_rgba(255,255,255,0.45),0_0_10px_rgba(93,164,207,0.4)] group-hover:shadow-[0_0_28px_rgba(255,255,255,0.85),0_0_16px_rgba(93,164,207,0.7)] group-hover:border-white transition-all duration-300 bg-white">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-contain p-1.5 select-none transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="p-1.5 rounded-full bg-black/75 text-white shadow-md">
                    <ZoomIn className="size-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Dialog
        open={active !== null}
        onOpenChange={(open) => !open && setActive(null)}
      >
        <DialogContent className="overflow-hidden p-0 sm:max-w-xl bg-neutral-950/95 border-white/20 text-white">
          {active && (
            <>
              <div className="w-full flex items-center justify-center bg-white p-6 min-h-[300px]">
                <img
                  src={active.src}
                  alt={active.title}
                  className="max-h-[340px] w-auto object-contain"
                />
              </div>
              <div className="p-5 pt-3">
                <DialogTitle className="text-lg font-semibold text-white">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-neutral-300">
                  {active.location}
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FloatingGalleryPreview;
