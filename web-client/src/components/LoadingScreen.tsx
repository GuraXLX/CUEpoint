import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
            {/* Rotating Knobs Container */}
            <div className="flex gap-8 mb-12">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center">
                        {/* Knob Indicator Line */}
                        <motion.div
                            className="absolute w-1 h-8 bg-black origin-bottom bottom-1/2 left-1/2 -translate-x-1/2"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.2 // Staggered rotation for visual interest
                            }}
                            style={{ borderRadius: '4px' }}
                        />
                    </div>
                ))}
            </div>

            {/* Branding Text */}
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">
                    <span className="text-white">CUE</span>
                    <span className="text-primary">point</span>
                    <span className="text-white">.ai</span>
                </h1>
                <p className="text-muted text-sm tracking-[0.2em] uppercase glow-neon">
                    Initializing System
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;
