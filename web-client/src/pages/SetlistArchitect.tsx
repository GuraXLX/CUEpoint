import { useState } from 'react';
import { SparklesIcon, MusicalNoteIcon, ClockIcon } from '@heroicons/react/24/outline';

const MOCK_TRACKS = [
    { id: 1, title: 'Deep Signals', artist: 'Echo-X', key: '8A', bpm: 124, energy: 65 },
    { id: 2, title: 'Pulse Drift', artist: 'Neon Void', key: '8A', bpm: 126, energy: 72 },
    { id: 3, title: 'Solar Flare', artist: 'Solaris', key: '9A', bpm: 128, energy: 85 },
    { id: 4, title: 'Titan Echo', artist: 'Kore', key: '9A', bpm: 127, energy: 88 },
    { id: 5, title: 'Event Horizon', artist: 'Kore', key: '10A', bpm: 130, energy: 95 },
];

export default function SetlistArchitect() {
    const [goal, setGoal] = useState('90-minute high-energy techno sunset');

    return (
        <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-700">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">SETLIST <span className="text-neutral-600">ARCHITECT</span></h1>
                    <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest">Workspace: Main A // Session 442</p>
                </div>

                <div className="flex gap-4">
                    <div className="glass-card px-4 py-2 border-white/5 flex items-center gap-3">
                        <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Total Duration</span>
                        <span className="font-mono font-bold text-primary">01:30:00</span>
                    </div>
                    <button className="px-6 py-2 bg-primary text-black font-mono text-xs uppercase tracking-wider font-bold hover:brightness-110 flex items-center gap-2 transition-all shadow-primary-btn">
                        <SparklesIcon className="w-4 h-4" /> Auto-Flow
                    </button>
                </div>
            </div>

            {/* Configuration Header - Reduced */}
            <div className="glass-card p-6 flex flex-col lg:flex-row gap-6 items-end border-white/5 bg-white/5">
                <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Setlist Objective</label>
                    <input
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full bg-transparent text-xl font-bold border-b border-white/10 focus:border-primary outline-none transition-all py-1 font-display"
                    />
                </div>
            </div>

            {/* Interactive Timeline & Energy Arc */}
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <h3 className="text-xl font-bold">The Journey Flow</h3>
                    <div className="flex gap-4 text-xs font-medium text-muted">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary/20 border border-primary/50 rounded-sm" /> Compatible Key</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-accent/20 border border-accent/50 rounded-sm" /> Energy Peak</div>
                    </div>
                </div>

                <div className="glass-card p-8 h-80 relative flex flex-col justify-end group">
                    {/* Energy Arc Visualization */}
                    <div className="absolute inset-0 top-8 left-8 right-8 h-40">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 100">
                            <defs>
                                <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.2" />
                                    <stop offset="50%" stopColor="#00F2FE" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#FF3366" stopOpacity="0.5" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M 0 80 Q 250 10 500 40 T 1000 20"
                                fill="none"
                                stroke="url(#arc-gradient)"
                                strokeWidth="4"
                                className="drop-shadow-cyan-glow"
                            />
                            {/* Harmonic connection lines */}
                            {MOCK_TRACKS.map((_, i) => i < MOCK_TRACKS.length - 1 && (
                                <line key={i} x1={200 * i + 100} y1="80" x2={200 * (i + 1) + 100} y2="80" stroke="#00F2FE" strokeWidth="1" strokeDasharray="4 4" className="opacity-40" />
                            ))}
                        </svg>
                    </div>

                    {/* Horizontal Timeline */}
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar relative z-10">
                        {MOCK_TRACKS.map((track, i) => (
                            <div key={i} className="flex-shrink-0 w-64 glass-card p-4 hover:glow-neon transition-all cursor-pointer group/track">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold">
                                        {track.key}
                                    </div>
                                    <div className="text-[10px] text-muted font-mono">{track.bpm} BPM</div>
                                </div>
                                <h4 className="font-bold truncate">{track.title}</h4>
                                <p className="text-xs text-muted truncate">{track.artist}</p>

                                {/* Micro Waveform Preview */}
                                <div className="mt-4 flex items-end gap-[2px] h-8 opacity-40 group-hover/track:opacity-100 transition-opacity">
                                    {[...Array(20)].map((_, j) => (
                                        <div key={j} className="flex-1 bg-primary/60 rounded-full" style={{ height: `${Math.random() * 100}%` }} />
                                    ))}
                                </div>

                                {/* Transition Icon (Glowing indicator between) */}
                                {i < MOCK_TRACKS.length - 1 && (
                                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-navy border border-primary/40 rounded-full flex items-center justify-center z-20 shadow-cyan-glow group-hover/track:scale-125 transition-transform">
                                        <SparklesIcon className="w-3 h-3 text-primary" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transition Matrix / Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                <div className="lg:col-span-2 glass-card p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <ClockIcon className="w-6 h-6 text-primary" />
                        Mix Engine Timeline
                    </h3>
                    <div className="space-y-6">
                        {[
                            { time: '0:00', type: 'Intro', desc: 'Spacey ambient intro blending into Deep Signals.' },
                            { time: '0:08', type: 'Transition', desc: 'Long blend transition from Pulse Drift to Solar Flare (Filtered).' },
                            { time: '0:14', type: 'Peak Flow', desc: 'Maintaining energy with Titan Echo. Cut transition recommended.' }
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <div className="w-16 font-mono text-primary font-bold pt-1">{step.time}</div>
                                <div className="flex-1 pb-6 border-l border-white/10 pl-6 relative">
                                    <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary" />
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-accent mb-1">{step.type}</h4>
                                    <p className="text-muted text-sm">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8 space-y-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Harmonic Analysis</h3>
                        <div className="p-4 bg-navy/40 rounded-xl border border-white/5 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted">Camelot Range</span>
                                <span className="text-sm font-bold text-primary">8A → 10A</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted">BPM Shift</span>
                                <span className="text-sm font-bold text-primary">+6 BPM Total</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Energy Distribution</h3>
                        <div className="h-4 w-full bg-navy/40 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '85%' }} />
                        </div>
                        <p className="text-xs text-muted mt-2">Optimal high-energy retention achieved.</p>
                    </div>
                    <button className="w-full btn-primary glow-neon">
                        Export Setlist to USB
                    </button>
                </div>
            </div>
        </div>
    );
}
