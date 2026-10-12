import FlowArt, { FlowSection } from './story-scroll.tsx';

export default function FlowArtDefaultDemo() {
  return (
    <FlowArt aria-label="Présentation Flow Art">
      <FlowSection
        aria-label="Qui nous sommes"
        style={{ backgroundColor: '#0B1220', color: '#fff' }}
        innerClassName="!justify-center !items-center text-center px-6 md:px-16 py-12 md:py-20"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-center mb-6 md:mb-8 opacity-80">
            Our Services
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center text-balance leading-[1.05]">
            Web - App
            <br />
            Development
          </h1>
          <p className="mt-6 md:mt-8 max-w-3xl lg:max-w-4xl text-xl sm:text-2xl font-normal leading-relaxed text-center opacity-90 mx-auto">
            We create fast, responsive websites and powerful applications that turn your ideas into seamless digital experiences.
          </p>
        </div>
      </FlowSection>

      <FlowSection
        aria-label="La mission"
        style={{ backgroundColor: '#0064E0', color: '#fff' }}
        innerClassName="!justify-center !items-center text-center px-6 md:px-16 py-12 md:py-20"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-center mb-6 md:mb-8 opacity-80">
            Our Services
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center text-balance leading-[1.05]">
            Meta Ads
          </h2>
          <p className="mt-6 md:mt-8 max-w-3xl lg:max-w-4xl text-xl sm:text-2xl font-normal leading-relaxed text-center opacity-90 mx-auto">
            We run targeted Facebook and Instagram ad campaigns that reach the right audience, generate quality leads, and drive business growth.
          </p>
        </div>
      </FlowSection>

      <FlowSection
        aria-label="Comment ça marche"
        style={{ backgroundColor: '#1C1C22', color: '#fff' }}
        innerClassName="!justify-center !items-center text-center px-6 md:px-16 py-12 md:py-20"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-center mb-6 md:mb-8 opacity-80">
            Our Services
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center leading-[1.08] md:leading-[1.05]">
            <span className="block whitespace-nowrap">Make Your Brand</span>
            <span className="block whitespace-nowrap">Unforgettable.</span>
          </h2>
          <p className="mt-6 md:mt-8 max-w-3xl lg:max-w-4xl text-xl sm:text-2xl font-normal leading-relaxed text-center opacity-90 mx-auto">
            We build distinctive brand identities that communicate your values, stand out from competitors, and leave a lasting impression.
          </p>
        </div>
      </FlowSection>

      <FlowSection
        aria-label="La vision"
        style={{ backgroundColor: '#B6C447', color: '#000' }}
        innerClassName="!justify-center !items-center text-center px-6 md:px-16 py-12 md:py-20"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-center mb-6 md:mb-8 opacity-80">
            Our Services
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center text-balance leading-[1.05]">
            Turn Attention
            <br />
            Into Growth.
          </h2>
          <p className="mt-6 md:mt-8 max-w-3xl lg:max-w-4xl text-xl sm:text-2xl font-normal leading-relaxed text-center opacity-90 mx-auto">
            We create engaging content and strategic social media campaigns that grow your audience, build trust, and strengthen your online presence.
          </p>
        </div>
      </FlowSection>

      <FlowSection
        aria-label="Abhxx"
        style={{ backgroundColor: '#082F2A', color: '#fff' }}
        innerClassName="!justify-center !items-center text-center px-6 md:px-16 py-12 md:py-20"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-center mb-6 md:mb-8 opacity-80">
            Our Services
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center leading-[1.08] md:leading-[1.05]">
            <span className="block whitespace-nowrap">Work Smarter.</span>
            <span className="block whitespace-nowrap">Automate More.</span>
          </h2>
          <p className="mt-6 md:mt-8 max-w-3xl lg:max-w-4xl text-xl sm:text-2xl font-normal leading-relaxed text-center opacity-90 mx-auto">
            We build intelligent AI-powered workflows and agents that reduce repetitive tasks, save time, and help your business scale efficiently.
          </p>
        </div>
      </FlowSection>

      <FlowSection
        aria-label="Nous rejoindre"
        style={{ backgroundColor: '#FFFFFF', color: '#000' }}
        innerClassName="!justify-center !items-center text-center px-6 md:px-16 py-12 md:py-20"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-center mb-6 md:mb-8 opacity-80">
            Our Services
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center text-balance leading-[1.05]">
            Ready
            <br />
            To Begin?
          </h2>
          <p
            className="font-manrope-regular mt-6 md:mt-8 max-w-3xl lg:max-w-4xl text-xl sm:text-2xl font-normal leading-relaxed text-center opacity-90 mx-auto"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400 }}
          >
            Let’s turn your ideas into reality with powerful websites, result-driven ads, standout branding, engaging social media, and intelligent AI automation. Together, we’ll build something extraordinary.
          </p>
        </div>
      </FlowSection>
    </FlowArt>
  );
}

export { default as TimelineDemo } from "./timeline-demo";
