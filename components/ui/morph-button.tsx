'use client';

import * as React from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
} from 'motion/react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Props for the MorphButton component.
 */
export interface MorphButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The label text to display in the button. */
  text: string;
  /** If true, replaces text with a spinner and shrinks the button width. */
  isLoading?: boolean;
  /** Optional icon to display to the left of the text. */
  icon?: React.ReactNode;
  /** Visual style variant of the button. */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** If true, enables the traveling perimeter light effect around the border. */
  hasLightEffect?: boolean;
  /** Color of the traveling light beam. */
  lightColor?: string;
  /** Width in pixels of the light beam. */
  lightWidth?: number;
  /** Duration of full border rotation in seconds. */
  duration?: number;
}

/**
 * A specialized button that performs a fluid width transition between
 * its standard text state and a circular loading state, with optional
 * traveling perimeter light border effect.
 */
export const MorphButton = React.forwardRef<HTMLButtonElement, MorphButtonProps>(
  (
    {
      text,
      isLoading = false,
      icon,
      variant = 'primary',
      hasLightEffect = true,
      lightColor = '#FAFAFA',
      lightWidth = 100,
      duration = 3.2,
      className,
      onClick,
      style,
      ...props
    },
    ref
  ) => {
    // Physics: Low stiffness (150) + high damping (25) creates the signature
    // "fluid" feel with zero elastic jitter.
    const transition: Transition = {
      type: 'spring',
      stiffness: 150,
      damping: 25,
      mass: 1,
    };

    const internalRef = React.useRef<HTMLButtonElement | null>(null);

    const setRefs = (node: HTMLButtonElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    };

    React.useEffect(() => {
      if (!internalRef.current || !hasLightEffect) return;
      const el = internalRef.current;
      const updatePath = () => {
        el.style.setProperty(
          "--path",
          `path('M 0 0 H ${el.offsetWidth} V ${el.offsetHeight} H 0 V 0')`
        );
      };
      updatePath();
      const ro = new ResizeObserver(updatePath);
      ro.observe(el);
      return () => ro.disconnect();
    }, [hasLightEffect]);

    const variantStyles = {
      primary:
        'bg-[#0D0907] text-white border-neutral-800 hover:bg-[#1c1511] shadow-sm',
      secondary:
        'bg-[#0D0907] text-white border-neutral-800 hover:bg-[#1c1511] shadow-sm',
      ghost:
        'bg-[#0D0907] text-white border-neutral-800 hover:bg-[#1c1511] shadow-sm',
    };

    return (
      <MotionConfig transition={transition}>
        <motion.button
          ref={setRefs}
          layout
          style={{
            "--duration": duration,
            "--light-width": `${lightWidth}px`,
            "--light-color": lightColor,
            isolation: "isolate",
            ...style,
          } as React.CSSProperties}
          className={cn(
            'relative flex h-9 sm:h-12 items-center justify-center overflow-hidden rounded-full border border-neutral-800/80 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer select-none text-xs sm:text-base',
            isLoading ? 'px-0' : 'px-4 sm:px-8',
            variantStyles[variant],
            (props.disabled || isLoading) &&
              'opacity-60 cursor-not-allowed pointer-events-none',
            className
          )}
          onClick={(e) => !isLoading && onClick?.(e)}
          whileTap={!isLoading ? { scale: 0.98 } : undefined}
          {...(props as any)}
        >
          {hasLightEffect && (
            <>
              {/* Traveling Perimeter Light Beam */}
              <div
                className="animate-star-btn absolute inset-0 aspect-square bg-[radial-gradient(ellipse_at_center,var(--light-color,#FAFAFA),transparent_70%)] pointer-events-none opacity-90 z-[1]"
                style={
                  {
                    offsetPath: "var(--path)",
                    offsetDistance: "0%",
                    width: "var(--light-width, 100px)",
                  } as React.CSSProperties
                }
              />
              {/* Solid core so light beam only traces the outer border rim */}
              <div className="absolute inset-[1.5px] rounded-full bg-inherit z-[2] pointer-events-none" />
            </>
          )}

          <div className="relative z-10 flex items-center justify-center">
            {/* 
              mode='popLayout' ensures the exiting element is removed from the flow immediately,
              allowing the parent container to animate its width smoothly without layout jumps.
            */}
            <AnimatePresence mode='popLayout' initial={false}>
              {isLoading ? (
                <motion.div
                  key='loader'
                  className='flex items-center justify-center'
                  style={{ width: '3rem' }}
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                >
                  <Loader2 className='h-5 w-5 animate-spin' />
                </motion.div>
              ) : (
                <motion.div
                  key='content'
                  className='flex items-center gap-2 whitespace-nowrap'
                  initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                >
                  {icon && <motion.span layout>{icon}</motion.span>}
                  <motion.span layout>{text}</motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </MotionConfig>
    );
  }
);

MorphButton.displayName = 'MorphButton';

export default MorphButton;
