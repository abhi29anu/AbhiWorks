"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

export type Photo = {
  id: number;
  src: string;
  title: string;
  location: string;
};

export const photos: Photo[] = [
  {
    id: 1,
    src: "/images/web-security-dashboard.svg",
    title: "Security & Data Privacy",
    location: "Fullstack Web Systems",
  },
  {
    id: 2,
    src: "/images/web-developer-coding.svg",
    title: "Continuous Code Engineering",
    location: "Frontend & Backend Architecture",
  },
  {
    id: 3,
    src: "/images/web-growth-rocket.svg",
    title: "High-Velocity App Launch",
    location: "Performance & Scale",
  },
  {
    id: 4,
    src: "/images/web-creative-collaboration.svg",
    title: "Creative UX Collaboration",
    location: "Your Creative Home",
  },
  {
    id: 5,
    src: "/images/web-analytics-magnifier.svg",
    title: "Deep Analytics & Insights",
    location: "Conversion & Monitoring",
  },
];

export default function GalleryBlock() {
  const [active, setActive] = React.useState<Photo | null>(null);

  return (
    <section className="flex min-h-svh w-full justify-center bg-background px-6 py-16 text-foreground">
      <div className="w-full max-w-4xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <Badge variant="secondary">Field Notes</Badge>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              Selected Work
            </h2>
          </div>
          <span className="text-sm text-muted-foreground tabular-nums">
            {photos.length} Photos
          </span>
        </div>

        <Dialog
          open={active !== null}
          onOpenChange={(open) => !open && setActive(null)}
        >
          <div className="grid aspect-[3/2] grid-cols-4 grid-rows-2 gap-2">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setActive(photo)}
                className={
                  "group relative overflow-hidden rounded-lg border border-border bg-muted " +
                  (index === 0 ? "col-span-2 row-span-2" : "")
                }
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="size-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                  loading="lazy"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-opacity group-hover:bg-foreground/10 group-hover:opacity-100">
                  <span className="flex size-9 items-center justify-center rounded-md bg-background/90 text-foreground">
                    <ZoomIn className="size-4" aria-hidden="true" />
                  </span>
                </span>
              </button>
            ))}
          </div>

          <DialogContent className="overflow-hidden p-0 sm:max-w-2xl">
            {active && (
              <>
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={active.src}
                    alt={active.title}
                    className="size-full object-cover"
                  />
                </div>
                <div className="p-4 pt-0">
                  <DialogTitle className="text-base">
                    {active.title}
                  </DialogTitle>
                  <DialogDescription>{active.location}</DialogDescription>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
