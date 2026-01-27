import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import AudioSpectrum from './AudioSpectrum';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#050505] flex overflow-hidden font-sans text-white selection:bg-primary selection:text-black">

            {/* LEFT PANEL: Interaction (The "Deck") */}
            <div className="w-full lg:w-[40%] flex flex-col justify-between px-8 sm:px-12 lg:px-20 py-12 relative z-20 bg-[#050505] border-r border-white/10 shadow-[20px_0_50px_rgba(0,0,0,0.5)]">

                {/* Header / Brand */}
                <div className="flex items-center gap-3">
                    <Logo className="h-8 w-8 text-primary" showText={false} />
                    <span className="font-display font-bold text-2xl tracking-widest text-white uppercase">CUE<span className="text-primary">POINT</span></span>
                </div>

                {/* Content Area */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-sm mx-auto"
                >
                    {children}
                </motion.div>

                {/* Footer / Status */}
                <div className="flex justify-between items-end text-[10px] uppercase tracking-widest text-white/30 font-mono">
                    <div>
                        <p>System Status: <span className="text-green-500">Online</span></p>
                        <p>v2.5.0 (Build 892)</p>
                    </div>
                    <div>© 2026 CP.AI</div>
                </div>
            </div>

            {/* RIGHT PANEL: Immersion (The "Engine") */}
            <div className="hidden lg:flex flex-1 relative bg-[#030303] items-center justify-center overflow-hidden bg-noise">

                {/* Cinematic Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}
                />

                {/* The Central Visual Engine */}
                <div className="relative z-10 w-full max-w-2xl px-12 flex flex-col items-center gap-12">

                    {/* Large Hero Text */}
                    <div className="text-center space-y-2">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-6xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50"
                        >
                            UNLOCK THE MIX
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-primary font-mono tracking-[0.3em] text-xs uppercase"
                        >
                            Advanced Audio Curation Engine
                        </motion.p>
                    </div>

                    {/* Dynamic Spectrum Visualizer */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="w-full"
                    >
                        <AudioSpectrum />
                    </motion.div>

                </div>

                {/* Decorative Data Lines */}
                <div className="absolute bottom-12 right-12 flex gap-2">
                    <div className="h-1 w-12 bg-primary/20" />
                    <div className="h-1 w-4 bg-primary/20" />
                    <div className="h-1 w-20 bg-primary/20" />
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;
