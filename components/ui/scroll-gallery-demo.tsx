"use client";

import { ScrollGallery, type ScrollGallerySlide } from "@/components/ui/scroll-gallery";
import firstSlideImg from "@/src/assets/images/regenerated_image_1791498521092.png";

export const GALLERY_SLIDES: ScrollGallerySlide[] = [
  {
    title: "Web Development Process",
    image: firstSlideImg,
    url: "#",
  },
  {
    title: "Subject Identified",
    image:
      "https://cdn.21st.dev/assets/localized/999a6f1ea688f9a5773a2c87a1b0bba9ab1883540bb8c076cc05f0bbd020e8f5.webp",
    url: "#",
  },
  {
    title: "Dossier 09",
    image:
      "https://cdn.21st.dev/assets/localized/3be3b5cf7b711fac32e9ac2f8d9f3376257351fd892080d24efb9b6d76f6e4b6.webp",
    url: "#",
  },
  {
    title: "Stairwell C7",
    image:
      "https://cdn.21st.dev/assets/localized/70740344cc7e98e830662f223995a973464ddb53d449e1da1ec28aca1a205c55.webp",
    url: "#",
  },
  {
    title: "abhiworks",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    url: "#",
  },
  {
    title: "anuworks",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80",
    url: "#",
  },
];

export function ScrollGalleryDemo() {
  return (
    <div className="w-full min-h-screen">
      <ScrollGallery
        slides={GALLERY_SLIDES}
        variant="studio"
        showPrefix={false}
        linkLabel="Our Services"
      />
    </div>
  );
}

export default ScrollGalleryDemo;
