import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Cpu, HardDrive, PanelRightOpen, PanelRightClose, Zap, Activity, ListMusic, ChevronUp } from 'lucide-react';

const MOCK_RECOMMENDATIONS = [
    { title: 'Solar Flare', artist: 'Solaris', key: '08A', bpm: 128, match: '98%' },
    { title: 'Deep Echo', artist: 'Kore', key: '09A', bpm: 126, match: '92%' },
    { title: 'Velvet System', artist: 'Neon_Void', key: '08B', bpm: 130, match: '88%' },
];

interface PlayerBarProps {
    isRightPanelOpen?: boolean;
    onToggleRightPanel?: () => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ isRightPanelOpen = true, onToggleRightPanel }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(35); // %
    const [pitch, setPitch] = useState(0); // %
    const [showRecommendations, setShowRecommendations] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Simulated Playback Engine
    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => (p >= 100 ? 0 : p + 0.1));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Draw Waveform
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const width = canvas.width;
        const height = canvas.height;
        const barWidth = 3;
        const gap = 1;
        const bars = Math.floor(width / (barWidth + gap));

        ctx.clearRect(0, 0, width, height);

        // Cyber Gradient
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#00F2FE');
        gradient.addColorStop(0.5, '#4facfe');
        gradient.addColorStop(1, '#00F2FE');

        for (let i = 0; i < bars; i++) {
            // Simulated Audio Data
            const x = i * (barWidth + gap);
            // More organic wave shape simulation
            const frequency = 0.05;
            const sine = Math.sin(i * frequency + (progress / 10));
            const random = Math.random() * 0.3;
            const amplitude = (height * 0.5) * (Math.abs(sine) + random + 0.2);

            const isPlayed = (i / bars) * 100 < progress;

            // Active vs Upcoming Colors
            ctx.fillStyle = isPlayed ? '#00F2FE' : '#222';

            // Glow effect for played bars
            if (isPlayed) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#00F2FE';
            } else {
                ctx.shadowBlur = 0;
            }

            // Draw symmetric wave from center
            const y = (height - amplitude) / 2;

            // Rounded bars look cleaner
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, amplitude, 2);
            ctx.fill();
        }

        // Draw Playhead
        const playheadX = (progress / 100) * width;
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFFFFF';
        ctx.fillRect(playheadX, 0, 1, height);

    }, [progress, canvasRef]);


    return (
        <div className="relative z-50">

            {/* Recommendations Popover - Styled as a Holographic Overlay */}
            {showRecommendations && (
                <div className="absolute bottom-28 right-8 w-80 bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden animate-in slide-in-from-bottom-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-50">
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <div className="p-4 border-b border-white/5 flex justify-between items-center">
                        <h4 className="font-display font-bold text-sm text-white tracking-widest flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary fill-primary" /> SONIC MATCH
                        </h4>
                        <button onClick={() => setShowRecommendations(false)} className="hover:text-primary transition-colors"><ChevronUp className="rotate-180 w-4 h-4" /></button>
                    </div>
                    <div>
                        {MOCK_RECOMMENDATIONS.map((track, i) => (
                            <div key={i} className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer group transition-all flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-sm text-neutral-300 group-hover:text-white transition-colors">{track.title}</div>
                                    <div className="text-[10px] text-neutral-500 group-hover:text-primary transition-colors tracking-wider uppercase">{track.artist}</div>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <div className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-accent mb-1">{track.key}</div>
                                    <div className="text-[9px] text-green-500 font-mono tracking-wide">{track.match} MATCH</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 bg-white/5 text-center text-[10px] font-mono text-neutral-400 uppercase cursor-pointer hover:bg-white/10 hover:text-white transition-colors tracking-widest">
                        Browse Semantic Library
                    </div>
                </div>
            )}

            {/* PLAYER UNIT */}
            {/* Using a border-t with a gradient to simulate a light edge */}
            <div className="h-24 bg-[#080808] border-t border-white/5 flex items-center px-6 gap-8 relative shadow-[0_-20px_60px_rgba(0,0,0,0.7)]">

                {/* Subtle top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

                {/* LEFT: INFORMATION DECK (Recessed Glass Look) */}
                <div className="w-[24rem] h-16 bg-[#030303] rounded-lg border border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] flex items-center p-2 gap-4 relative overflow-hidden group">
                    {/* Glass Reflection */}
                    <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 opacity-20 pointer-events-none" />

                    {/* Art */}
                    <div className="h-12 w-12 bg-neutral-900 rounded relative overflow-hidden shrink-0 border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Activity className={`w-5 h-5 text-white ${isPlaying ? 'animate-pulse' : 'opacity-50'}`} />
                        </div>
                    </div>

                    {/* Digital Readout */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-white font-display text-lg leading-none tracking-wide truncate text-shadow-glow">HYPER-REALITY</h4>
                            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">DK-A</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-primary shadow-[0_0_5px_#D4FF00]" />
                                <span className="text-[10px] font-mono text-neutral-300">Neon Systems</span>
                            </div>
                            <div className="h-3 w-[1px] bg-white/10" />
                            <span className="text-[10px] font-mono text-primary font-bold">128.00 BPM</span>
                            <span className="text-[10px] font-mono text-neutral-400">08A</span>
                        </div>
                    </div>
                </div>

                {/* CENTER: TRANSPORT & WAVE (The "Engine") */}
                <div className="flex-1 flex flex-col justify-center h-full py-3 gap-0">

                    {/* Time & Waveform Container */}
                    <div className="flex-1 flex items-center gap-4 mb-1">
                        <span className="text-[10px] font-mono text-primary font-bold w-10 text-right">01:24</span>

                        {/* Waveform Screen */}
                        <div className="flex-1 h-10 bg-[#050505] rounded border border-white/10 relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group">
                            <canvas ref={canvasRef} className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                            {/* Scanline overlay */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
                        </div>

                        <span className="text-[10px] font-mono text-neutral-500 w-10 text-left">-03:42</span>
                    </div>

                    {/* Tactile Controls */}
                    <div className="flex items-center justify-center gap-6 relative">
                        {/* Subtle connection line */}
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 -z-10" />

                        {/* Secondary Controls */}
                        <div className="flex gap-2">
                            <button className="h-8 w-8 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/30 transition-all shadow-lg active:translate-y-[1px]">
                                <Shuffle size={12} />
                            </button>
                            <button className="h-8 w-8 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/30 transition-all shadow-lg active:translate-y-[1px]">
                                <Repeat size={12} />
                            </button>
                        </div>

                        {/* Primary Transport */}
                        <div className="flex items-center gap-4 p-1 bg-[#030303] rounded-full border border-white/5 shadow-xl">
                            <button className="p-3 text-neutral-400 hover:text-white hover:scale-110 transition-all"><SkipBack size={18} fill="currentColor" /></button>

                            {/* The "CUE POINT" / PLAY Button - Hero Element */}
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className={`h-12 w-12 rounded-full flex items-center justify-center transition-all bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 active:shadow-inner relative overflow-hidden`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-tr from-gray-200 to-white ${isPlaying ? 'opacity-100' : 'opacity-100'}`} />
                                {isPlaying && <div className="absolute inset-0 bg-primary/20 animate-pulse" />} {/* Inner pulse on play */}

                                <div className="relative z-10">
                                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                                </div>
                            </button>

                            <button className="p-3 text-neutral-400 hover:text-white hover:scale-110 transition-all"><SkipForward size={18} fill="currentColor" /></button>
                        </div>

                        {/* Context Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowRecommendations(!showRecommendations)}
                                className={`h-8 px-3 rounded-full border flex items-center gap-2 transition-all shadow-lg text-[10px] font-bold tracking-wider active:translate-y-[1px] ${showRecommendations ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(212,255,0,0.3)]' : 'bg-[#111] border-white/10 text-white hover:border-white/30'}`}
                            >
                                <ListMusic size={12} /> REC
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT: UTILITY & SYSTEM (Technical Panel) */}
                <div className="w-auto pl-8 h-full flex items-center justify-end gap-5">

                    {/* System Readouts - Styled as micro-displays */}
                    <div className="hidden xl:flex gap-1">
                        {[
                            { label: 'CPU', val: '34%', icon: Cpu },
                            { label: 'SSD', val: '1.2T', icon: HardDrive },
                            { label: 'LAT', val: '12ms', icon: Activity }
                        ].map((stat, i) => (
                            <div key={i} className="bg-[#111] border border-white/5 px-2 py-1 rounded flex flex-col items-center w-12">
                                <span className="text-[8px] font-mono text-neutral-500 mb-0.5">{stat.label}</span>
                                <span className="text-[9px] font-mono text-white font-bold">{stat.val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Vertical Divider */}
                    <div className="h-8 w-[1px] bg-white/10" />

                    {/* Master Volume with segmented LED look */}
                    <div className="flex items-center gap-3">
                        <Volume2 size={16} className="text-neutral-500" />
                        <div className="flex gap-[2px]">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={`w-1 h-4 rounded-[1px] ${i < 6 ? 'bg-white' : 'bg-neutral-700'}`} />
                            ))}
                            <div className="w-1 h-4 rounded-[1px] bg-red-500 opacity-50" /> {/* Peak Limiter */}
                        </div>
                    </div>

                    {/* Panel Toggle */}
                    {onToggleRightPanel && (
                        <button
                            onClick={onToggleRightPanel}
                            className={`ml-2 h-9 w-9 rounded flex items-center justify-center transition-all ${isRightPanelOpen ? 'text-primary bg-primary/10' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}
                        >
                            {isRightPanelOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
};

export default PlayerBar;
