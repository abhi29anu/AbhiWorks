import { cn } from "@/lib/utils";

export type Testimonial2Props = {
  /** Full display name of the person giving the testimonial. */
  authorName: string;
  /** Short tagline, title, or description of the person. */
  authorTagline?: string;
  /** Link to the person's profile, website, or social media page. */
  url?: string;
  /** The testimonial text content or recommendation message. */
  quote: string;
  /** Additional CSS classes to apply to the testimonial container. */
  className?: string;
};

export function Testimonial2({
  className,
  authorName,
  authorTagline,
  url,
  quote,
}: Testimonial2Props) {
  return (
    <figure className={cn("relative flex flex-col gap-6 pl-3", className)}>
      <blockquote
        className="font-manrope-regular relative block w-full text-xl text-neutral-900 dark:text-neutral-100 md:max-w-xl md:text-2xl leading-relaxed"
        style={{ fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif", fontWeight: 400 }}
      >
        <span
          className="absolute -left-3 text-neutral-400 dark:text-neutral-500 select-none"
          aria-hidden="true"
        >
          “
        </span>
        <p className="inline text-pretty">{quote}</p>
        <span
          className="absolute translate-x-0.5 text-neutral-400 dark:text-neutral-500 select-none"
          aria-hidden="true"
        >
          ”
        </span>
      </blockquote>

      <figcaption className="ml-auto flex w-full items-center gap-2 md:w-1/2">
        <div className="hidden h-px w-[12.5%] min-w-[24px] ml-auto translate-y-px bg-[#000000] dark:bg-neutral-100 md:block" />

        <div className="flex flex-col shrink-0 md:text-right">
          <span className="text-sm leading-none font-medium text-neutral-900 dark:text-neutral-100">
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                <span className="absolute inset-0" aria-hidden />
                {authorName}
              </a>
            ) : (
              <span>{authorName}</span>
            )}
            {authorTagline && (
              <span className="mt-1 block text-neutral-500 dark:text-neutral-400 md:mt-0 md:inline">
                <span className="hidden text-neutral-900 dark:text-neutral-100 md:inline">, </span>
                {authorTagline}
              </span>
            )}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export default Testimonial2;
