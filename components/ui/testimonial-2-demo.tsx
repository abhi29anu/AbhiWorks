import { Testimonial2 } from "@/components/ui/testimonial-2";
import MorphButtonIconsDemo from "@/components/ui/morph-button-demo";

export default function Testimonial2Demo() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-between min-h-[60vh] sm:min-h-[70vh] p-6 sm:p-10">
      <div className="w-full">
        <Testimonial2
          authorName="Abhilash Kashapaga"
          quote="We're just getting started, and we'd love to hear what you think. Your feedback means a lot to us."
        />
      </div>
      <div className="w-full flex justify-center mt-auto pt-16 sm:pt-24 md:pt-32 pb-4">
        <MorphButtonIconsDemo />
      </div>
    </div>
  );
}
