export const Logo = ({ size = 48, className = "" }) => {
    return (
        <div className={`relative flex items-center gap-3 ${className}`}>
            <div
                style={{ width: size, height: size }}
                className="relative group transition-transform duration-500 hover:scale-110"
            >
                {/* Outer stylized C ring */}
                <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 animate-pulse-slow"
                >
                    <path
                        d="M 80 20 A 45 45 0 1 0 80 80"
                        fill="none"
                        stroke="url(#cyan-glow)"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00F2FE" />
                            <stop offset="100%" stopColor="#0072FF" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Inner Play Button / Cue Point */}
                <div className="absolute inset-0 flex items-center justify-center pl-1">
                    <div
                        className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-primary border-b-[12px] border-b-transparent drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]"
                    />
                </div>

                {/* Cue Mark Dot (The "Point") - Animates on load */}
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-pink-glow animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75" />
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-pink-glow" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-white uppercase italic">
                CuePoint<span className="text-primary not-italic">AI</span>
            </span>
        </div>
    );
};
