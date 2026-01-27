import React from 'react';
import { clsx } from 'clsx';

interface LogoProps {
    className?: string;
    classNameText?: string;
    showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, classNameText, showText = true }) => {
    return (
        <div className={clsx("flex items-center gap-3", className)}>
            {/* The Logo Mark */}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10" // Default size, can be overridden by parent opacity/scale
            >
                {/* Outer Ring (The "C") - Broken/Open Circle */}
                <path
                    d="M85 50a35 35 0 1 1-10.25-24.75"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="text-white"
                />

                {/* The Cue Point (Target) */}
                <circle cx="50" cy="50" r="10" fill="currentColor" className="text-primary" />

                {/* Connection Line (Abstract "Needle" or "Signal") */}
                <path
                    d="M50 50 L95 20"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="text-primary/50"
                />
            </svg>

            {/* Text Mark */}
            {showText && (
                <span className={clsx("font-bold tracking-tight text-white select-none", classNameText)}>
                    CUE<span className="text-primary">point</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
export { Logo };
