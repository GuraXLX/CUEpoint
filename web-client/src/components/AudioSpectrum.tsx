import React from 'react';
import { motion } from 'framer-motion';

const AudioSpectrum: React.FC = () => {
    return (
        <div className="w-full h-8 flex items-center justify-center opacity-60">
            {/* Minimal Signal Line */}
            <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
                {/* Scanning Pulse */}
                <motion.div
                    className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-primary to-transparent"
                    animate={{ x: [-100, 400] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 1
                    }}
                    style={{ opacity: 0.5 }}
                />

                {/* Center Stable Anchor */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_#D4FF00]" />
            </div>
        </div>
    );
};

export default AudioSpectrum;
