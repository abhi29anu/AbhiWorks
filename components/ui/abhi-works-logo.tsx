import * as React from "react";

export interface AbhiWorksLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function AbhiWorksLogo({
  className = "w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60",
  ...props
}: AbhiWorksLogoProps) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Abhi Works Logo"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Left spine of 'A' rising up to rounded apex */}
        <path
          d="M 166 587 C 190 490 230 330 286 274 C 302 258 322 268 338 290 C 378 344 434 466 462 572 C 470 600 473 624 472 635"
          strokeWidth="12"
        />
        {/* Lower tapering tail of 'A' extending downward and leftward */}
        <path
          d="M 472 635 C 470 690 455 770 405 848"
          strokeWidth="11"
        />
        {/* Feathered dynamic contour lines along right arc of 'A' */}
        <path
          d="M 308 288 C 342 334 390 430 422 515 C 438 556 448 595 452 622"
          strokeWidth="5"
        />
        <path
          d="M 326 312 C 354 352 396 438 424 506"
          strokeWidth="3"
        />

        {/* 'W' stroke 1: joint at (472, 635) up to central peak at (575, 430) */}
        <path
          d="M 472 635 L 575 430"
          strokeWidth="14"
        />
        {/* 'W' stroke 2: peak to valley at (663, 582) */}
        <path
          d="M 575 430 L 663 582"
          strokeWidth="14"
        />
        {/* 'W' stroke 3: arrow shaft rising to upper-right tip at (829, 156) */}
        <path
          d="M 663 582 C 685 530 735 340 829 156"
          strokeWidth="13"
        />

        {/* Arrow head at (829, 156) */}
        <path
          d="M 802 157 L 829 156 L 833 178"
          strokeWidth="7"
        />
      </g>

      {/* 'ABHI WORKS' text in center of 'A' */}
      <text
        x="316"
        y="514"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
        fontSize="21"
        fontWeight="700"
        letterSpacing="0.32em"
      >
        ABHI  WORKS
      </text>
    </svg>
  );
}

export default AbhiWorksLogo;
