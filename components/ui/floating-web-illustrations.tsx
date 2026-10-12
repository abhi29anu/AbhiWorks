import React from 'react';

/**
 * 5 precise vector illustrations matching the user's uploaded images:
 * 1. Developer Coding at Laptop with </> (web2.png)
 * 2. Rocket Launch & Analytics Dashboard (web2'''.png)
 * 3. Team Collaboration on Web Project "Your Creative Home" (web22..,,.png)
 * 4. Desktop Monitor with Magnifying Glass & Charts (webbbb - Edited.png)
 * 5. Security Padlock & Metric Graphs (web2...png)
 */

export const DeveloperCodingIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Head & Hair */}
    <path d="M52 24 C50 18 64 16 68 20 C72 18 78 22 74 28 C74 34 68 40 60 40 C52 40 48 32 52 24 Z" />
    <path d="M54 22 C56 16 66 18 64 24" />
    <path d="M52 28 C50 32 54 36 60 36 C66 36 68 32 68 28" />
    {/* Glasses */}
    <rect x="52" y="26" width="7" height="5" rx="1.5" />
    <rect x="61" y="26" width="7" height="5" rx="1.5" />
    <line x1="59" y1="28.5" x2="61" y2="28.5" />
    {/* Neck & Collar */}
    <path d="M57 37 L57 44 L50 49 L59 52" />
    <path d="M63 37 L63 44 L70 49 L61 52" />
    {/* Shoulders & Torso */}
    <path d="M48 50 L34 62 L26 84" />
    <path d="M72 50 L86 62 L94 82" />
    <line x1="60" y1="52" x2="60" y2="70" />
    {/* Laptop */}
    <rect x="36" y="70" width="48" height="30" rx="2" fill="currentColor" fillOpacity="0.08" />
    {/* Code symbols </> on laptop screen */}
    <path d="M54 81 L49 85 L54 89" strokeWidth="2.5" />
    <line x1="58" y1="90" x2="62" y2="80" strokeWidth="2.5" />
    <path d="M66 81 L71 85 L66 89" strokeWidth="2.5" />
    {/* Hands on keyboard */}
    <path d="M26 84 C28 88 34 90 38 88 C40 86 42 84 44 86" />
    <path d="M94 82 C90 86 86 88 82 86 C80 84 78 86 76 86" />
    {/* Mouse & cord */}
    <rect x="22" y="86" width="6" height="9" rx="3" />
    <path d="M25 95 C22 98 16 98 12 96 C8 94 6 96 4 96" />
  </svg>
);

export const RocketLaunchIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Dashboard Board Frame */}
    <rect x="18" y="32" width="70" height="52" rx="4" fill="currentColor" fillOpacity="0.08" />
    {/* Speedometer gauge top left */}
    <path d="M26 48 A 9 9 0 0 1 42 48" />
    <line x1="34" y1="48" x2="38" y2="43" strokeWidth="2" />
    {/* Flame spark above gauge */}
    <path d="M43 40 C43 37 45 36 46 38 C47 37 49 39 48 42" strokeWidth="1.8" />
    {/* Upward steep curve */}
    <path d="M24 74 C34 72 38 64 48 56 C56 50 64 42 78 28" strokeWidth="2.5" />
    {/* Rocket blasting off at the end of curve */}
    <g transform="translate(76, 16) rotate(42)">
      <path d="M0 16 C-4 12 -4 4 0 0 C4 4 4 12 0 16 Z" fill="currentColor" fillOpacity="0.15" />
      <circle cx="0" cy="7" r="2" />
      <path d="M-3 12 L-6 16 L-2 15" />
      <path d="M3 12 L6 16 L2 15" />
      {/* Exhaust flames */}
      <path d="M-2 16 L0 21 L2 16" strokeWidth="1.8" />
    </g>
    {/* Settings / slider box */}
    <rect x="52" y="58" width="22" height="16" rx="2" strokeWidth="1.8" />
    <line x1="56" y1="63" x2="68" y2="63" strokeWidth="1.6" />
    <circle cx="60" cy="63" r="1.5" fill="currentColor" />
    <line x1="56" y1="69" x2="68" y2="69" strokeWidth="1.6" />
    <circle cx="65" cy="69" r="1.5" fill="currentColor" />
    {/* Observer Person looking up */}
    <circle cx="94" cy="46" r="4.5" />
    <path d="M91 51 C88 56 88 64 91 70 L91 92" />
    <path d="M95 51 C98 56 98 64 96 70 L97 92" />
    <path d="M89 57 C86 60 87 64 89 65" />
  </svg>
);

export const CreativeCollaborationIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Central Browser window */}
    <rect x="36" y="38" width="46" height="34" rx="2" fill="currentColor" fillOpacity="0.08" />
    {/* Browser header bar with dots */}
    <line x1="36" y1="44" x2="82" y2="44" strokeWidth="1.5" />
    <circle cx="39" cy="41" r="1" fill="currentColor" />
    <circle cx="42" cy="41" r="1" fill="currentColor" />
    {/* Text line 'Your Creative Home' */}
    <line x1="47" y1="41" x2="68" y2="41" strokeWidth="1.5" />
    {/* Image placeholder inside */}
    <path d="M42 66 L52 54 L62 66 Z" fill="currentColor" fillOpacity="0.12" />
    <path d="M58 66 L68 56 L78 66 Z" fill="currentColor" fillOpacity="0.12" />
    <circle cx="71" cy="51" r="2.5" />
    {/* Top left hand holding lightbulb */}
    <path d="M16 54 C20 48 26 44 32 46 C34 44 38 46 38 49" />
    {/* Lightbulb */}
    <g transform="translate(35, 34)">
      <circle cx="0" cy="0" r="6" fill="currentColor" fillOpacity="0.1" />
      <path d="M-2 5 L2 5" strokeWidth="2" />
      <path d="M-4 -8 L-5 -10" strokeWidth="1.8" />
      <path d="M0 -8 L0 -11" strokeWidth="1.8" />
      <path d="M4 -8 L5 -10" strokeWidth="1.8" />
    </g>
    {/* Top right hand placing star */}
    <path d="M98 28 C90 32 86 38 82 44" />
    {/* Star */}
    <path
      d="M74 38 L76 43 L81 44 L77 48 L78 53 L74 50 L69 53 L71 48 L67 44 L72 43 Z"
      fill="currentColor"
      fillOpacity="0.18"
      strokeWidth="1.8"
    />
    {/* Bottom right hand with drawing pen */}
    <path d="M88 84 C84 76 80 68 76 60" />
    <rect x="74" y="54" width="10" height="4.5" rx="1" transform="rotate(-35 74 54)" strokeWidth="1.8" />
    {/* Bottom left hand with coffee cup */}
    <path d="M42 82 C46 76 50 72 58 72 C62 72 65 74 66 77" />
    {/* Coffee Cup */}
    <rect x="24" y="66" width="9" height="11" rx="2" />
    <path d="M33 69 C36 69 36 74 33 74" />
    <rect x="22" y="78" width="13" height="1.5" />
    {/* Looping curved arrow */}
    <path d="M42 22 C48 16 58 18 60 26 L55 26" strokeWidth="2" />
  </svg>
);

export const AnalyticsSearchIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Document sheet with pencil at top left */}
    <rect x="18" y="22" width="30" height="40" rx="2" fill="currentColor" fillOpacity="0.08" />
    <line x1="24" y1="29" x2="38" y2="29" strokeWidth="1.8" />
    <line x1="24" y1="36" x2="34" y2="36" strokeWidth="1.8" />
    {/* Angled pencil */}
    <line x1="12" y1="22" x2="30" y2="38" strokeWidth="3" />
    <path d="M30 38 L32 40 L28 40 Z" fill="currentColor" />
    {/* Desktop Monitor */}
    <rect x="28" y="44" width="60" height="42" rx="4" fill="currentColor" fillOpacity="0.1" />
    {/* Monitor Stand */}
    <path d="M50 86 L48 94 L70 94 L68 86" strokeWidth="2.5" />
    {/* Mini Pie Chart card on left */}
    <rect x="24" y="48" width="28" height="26" rx="2" fill="currentColor" fillOpacity="0.12" />
    <circle cx="36" cy="61" r="8" strokeWidth="2" />
    <path d="M36 53 L36 61 L42 65" strokeWidth="2" />
    {/* Big Magnifying Glass over right chart */}
    <g transform="translate(76, 50)">
      <circle cx="0" cy="0" r="22" strokeWidth="3" fill="currentColor" fillOpacity="0.06" />
      {/* Handle */}
      <line x1="16" y1="16" x2="32" y2="32" strokeWidth="4.5" strokeLinecap="round" />
      {/* Graph line seen magnified inside lens */}
      <path d="M-12 10 L-6 4 L2 8 L12 -6" strokeWidth="2.5" />
      <line x1="-12" y1="-12" x2="-12" y2="12" strokeWidth="1.5" />
      <line x1="-12" y1="12" x2="14" y2="12" strokeWidth="1.5" />
    </g>
  </svg>
);

export const SecurityDataIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Background dashboard cards */}
    <rect x="44" y="24" width="50" height="40" rx="3" fill="currentColor" fillOpacity="0.08" />
    <line x1="78" y1="32" x2="78" y2="54" strokeWidth="3" strokeLinecap="round" />
    <line x1="84" y1="38" x2="84" y2="54" strokeWidth="3" strokeLinecap="round" />
    <line x1="90" y1="30" x2="90" y2="54" strokeWidth="3" strokeLinecap="round" />
    {/* Metric panel foreground */}
    <rect x="24" y="36" width="46" height="36" rx="3" fill="currentColor" fillOpacity="0.1" />
    <path d="M28 54 C34 46 42 56 48 48 C54 44 60 48 66 54" strokeWidth="2" />
    <rect x="30" y="58" width="5" height="10" strokeWidth="1.8" />
    <rect x="38" y="62" width="5" height="6" strokeWidth="1.8" />
    <rect x="46" y="56" width="5" height="12" strokeWidth="1.8" />
    {/* Developer standing on right */}
    <circle cx="70" cy="38" r="5" />
    <path d="M66 34 C64 30 72 28 75 32 C78 35 76 40 70 43" />
    {/* Body & legs */}
    <path d="M68 44 L64 68 L64 92" />
    <path d="M72 44 L76 68 L76 92" />
    <path d="M60 92 L66 94" strokeWidth="2.5" />
    <path d="M74 92 L80 94" strokeWidth="2.5" />
    {/* Large Security Padlock held in hands */}
    <g transform="translate(54, 52)">
      {/* Shackle */}
      <path d="M2 4 C2 -4 14 -4 14 4 L14 8 L2 8 Z" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
      {/* Body */}
      <rect x="-2" y="8" width="20" height="16" rx="3" strokeWidth="2.5" fill="currentColor" fillOpacity="0.15" />
      {/* Keyhole */}
      <circle cx="8" cy="14" r="2" fill="currentColor" />
      <line x1="8" y1="15" x2="8" y2="18" strokeWidth="2.5" />
    </g>
  </svg>
);

export interface FloatingItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  duration: string;
  delay: string;
  glowColor: string;
  rotation: string;
}

export const FloatingWebIllustrations: React.FC<{ className?: string }> = ({ className = '' }) => {
  const items: FloatingItem[] = [
    {
      id: 'code',
      title: 'Full-Stack Code',
      category: 'Development',
      icon: <DeveloperCodingIcon />,
      duration: '4.2s',
      delay: '0s',
      glowColor: 'rgba(56, 189, 248, 0.45)', // Cyan glow
      rotation: '-2deg',
    },
    {
      id: 'rocket',
      title: 'Rapid Deployment',
      category: 'Performance',
      icon: <RocketLaunchIcon />,
      duration: '5.1s',
      delay: '0.6s',
      glowColor: 'rgba(99, 102, 241, 0.45)', // Indigo glow
      rotation: '2deg',
    },
    {
      id: 'collab',
      title: 'Creative UX/UI',
      category: 'Design Systems',
      icon: <CreativeCollaborationIcon />,
      duration: '4.6s',
      delay: '1.2s',
      glowColor: 'rgba(236, 72, 153, 0.45)', // Pink glow
      rotation: '-3deg',
    },
    {
      id: 'analytics',
      title: 'Audit & Search',
      category: 'Optimization',
      icon: <AnalyticsSearchIcon />,
      duration: '3.9s',
      delay: '0.3s',
      glowColor: 'rgba(234, 179, 8, 0.45)', // Amber glow
      rotation: '2.5deg',
    },
    {
      id: 'security',
      title: 'Data & Security',
      category: 'Reliability',
      icon: <SecurityDataIcon />,
      duration: '4.8s',
      delay: '0.9s',
      glowColor: 'rgba(16, 185, 129, 0.45)', // Emerald glow
      rotation: '-1.5deg',
    },
  ];

  return (
    <div
      className={`w-full flex flex-wrap items-center justify-start gap-4 md:gap-6 pt-2 pb-2 ${className}`}
    >
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="group relative flex items-center gap-3 px-3.5 py-2.5 md:px-4 md:py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-300/40 backdrop-blur-md transition-all duration-300 cursor-pointer select-none"
          style={{
            animation: `floatRandom${(idx % 3) + 1} ${item.duration} ease-in-out infinite alternate`,
            animationDelay: item.delay,
            transform: `rotate(${item.rotation})`,
            boxShadow: `0 0 16px ${item.glowColor}, inset 0 0 12px rgba(255, 255, 255, 0.03)`,
          }}
        >
          {/* Glowing ambient pulse backdrop */}
          <div
            className="absolute -inset-1 rounded-2xl opacity-40 group-hover:opacity-75 blur-md transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 70%)`,
            }}
          />

          {/* Small illustration icon */}
          <div
            className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 text-white group-hover:scale-110 transition-transform duration-300"
            style={{
              filter: `drop-shadow(0 0 8px ${item.glowColor})`,
            }}
          >
            {item.icon}
          </div>

          {/* Micro text label */}
          <div className="relative flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-200/90 group-hover:text-white transition-colors font-mono">
              {item.title}
            </span>
            <span className="text-[9.5px] uppercase tracking-widest text-white/50 font-medium">
              {item.category}
            </span>
          </div>
        </div>
      ))}

      {/* Embedded CSS for independent multi-axis random floating */}
      <style>{`
        @keyframes floatRandom1 {
          0% {
            transform: translateY(0px) translateX(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-8px) translateX(3px) rotate(1deg);
          }
          100% {
            transform: translateY(4px) translateX(-4px) rotate(-1deg);
          }
        }
        @keyframes floatRandom2 {
          0% {
            transform: translateY(0px) translateX(0px) rotate(2deg);
          }
          50% {
            transform: translateY(-10px) translateX(-3px) rotate(-1.5deg);
          }
          100% {
            transform: translateY(5px) translateX(3px) rotate(2.5deg);
          }
        }
        @keyframes floatRandom3 {
          0% {
            transform: translateY(0px) translateX(0px) rotate(-1deg);
          }
          50% {
            transform: translateY(-7px) translateX(4px) rotate(2deg);
          }
          100% {
            transform: translateY(3px) translateX(-2px) rotate(-2deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingWebIllustrations;
