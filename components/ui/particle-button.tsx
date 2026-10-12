import React from "react";

interface ParticleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const ParticleButton = React.forwardRef<HTMLButtonElement, ParticleButtonProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`particle-button ${className}`}
        {...props}
      >
        <div className="points_wrapper">
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
          <i className="point" />
        </div>

        <span className="inner">
          {children || "Scroll ↓ "}
        </span>
      </button>
    );
  }
);

ParticleButton.displayName = "ParticleButton";
export default ParticleButton;
