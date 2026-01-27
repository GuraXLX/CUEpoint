import { useState } from 'react';
import { BeakerIcon, ArrowUpTrayIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const MOCK_METRICS = [
    { name: 'Mix Clarity', score: 92, color: '#00F2FE', feedback: 'Transients are sharp. Mid-range separation is 9.2/10.' },
    { name: 'Low-End Power', score: 68, color: '#FF3366', feedback: 'Your kick drum is masking your sub-bass around 60Hz. Try sidechaining the kick.' },
    { name: 'Stereo Width', score: 85, color: '#00F2FE', feedback: 'Great mono compatibility. Side information is well-balanced.' },
    { name: 'Dynamic Range', score: 74, color: '#00F2FE', feedback: 'Master is slightly over-compressed. Back off 1.5dB on the limiter.' },
];

export default function TrackDoctor() {
    const [analyzing, setAnalyzing] = useState(false);
    const [report, setReport] = useState<any>(null);
    const [activeMetric, setActiveMetric] = useState<number | null>(null);

    const startAnalysis = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setReport(MOCK_METRICS);
        }, 3000);
    };

    return (
        <div className="space-y-12 animate-in slide-in-from-bottom-6 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">TRACK <span className="text-neutral-600">DOCTOR</span></h1>
                    <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest">Workspace: Main A // Session 442</p>
                </div>
            </div>
            {/* Upload Section */}
            {!report && !analyzing && (
                <div className="glass-card p-12 border-dashed border-2 flex flex-col items-center justify-center space-y-6 hover:glow-neon transition-all duration-500 cursor-pointer text-center group" onClick={startAnalysis}>
                    <div className="p-6 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                        <ArrowUpTrayIcon className="w-12 h-12 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Initialize Spectral Scan</h2>
                        <p className="text-muted">Drop your WAV, MP3, or FLAC stems here for objective AI grading.</p>
                    </div>
                    <div className="text-xs text-muted/60">Limit 50MB per signal</div>
                </div>
            )}

            {/* Analyzing State */}
            {analyzing && (
                <div className="glass-card p-20 flex flex-col items-center justify-center space-y-12">
                    <div className="relative">
                        <div className="w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <BeakerIcon className="w-10 h-10 text-primary animate-pulse" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold animate-pulse">Scanning Frequency DNA...</h2>
                        <p className="text-muted mt-2">Our AI is dissecting your dynamics and spectral balance.</p>
                    </div>
                </div>
            )}

            {/* The Report Card (Radial Visualizer) */}
            {report && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
                    <div className="relative flex items-center justify-center">
                        {/* Radial SVG Rings */}
                        <svg className="w-[400px] h-[400px] -rotate-90">
                            {report.map((metric: any, i: number) => {
                                const radius = 80 + i * 35;
                                const circumference = 2 * Math.PI * radius;
                                const strokeDashoffset = circumference - (metric.score / 100) * circumference;
                                return (
                                    <circle
                                        key={metric.name}
                                        cx="200"
                                        cy="200"
                                        r={radius}
                                        fill="none"
                                        stroke={metric.color}
                                        strokeWidth="12"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out opacity-20 hover:opacity-100 cursor-pointer"
                                        onMouseEnter={() => setActiveMetric(i)}
                                        onClick={() => setActiveMetric(i)}
                                    />
                                );
                            })}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-6xl font-black tracking-tighter text-white">A-</span>
                            <span className="text-sm font-bold text-primary uppercase tracking-widest mt-2">Overall Grade</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold mb-8">Spectral Diagnostics</h2>
                        {report.map((metric: any, i: number) => (
                            <div
                                key={metric.name}
                                className={`glass-card p-6 transition-all duration-300 cursor-pointer ${activeMetric === i ? 'glow-neon border-primary/40' : 'border-white/5 opacity-60'
                                    }`}
                                onMouseEnter={() => setActiveMetric(i)}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: metric.color }} />
                                        {metric.name}
                                    </h3>
                                    <span className="font-mono text-primary font-bold">{metric.score}%</span>
                                </div>
                                {activeMetric === i && (
                                    <div className="mt-4 animate-in slide-in-from-top-2">
                                        <p className="text-sm text-muted leading-relaxed mb-4">{metric.feedback}</p>
                                        <div className="h-20 bg-navy/60 rounded-lg flex items-end gap-[1px] p-2 border border-white/5">
                                            {[...Array(40)].map((_, j) => (
                                                <div key={j} className="flex-1 bg-primary/40 rounded-t-sm" style={{ height: `${Math.random() * (i === 1 ? 90 : 40)}%` }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <button className="btn-primary w-full shadow-cyan-glow mt-4" onClick={() => setReport(null)}>
                            Check New Signal
                        </button>
                    </div>
                </div>
            )}

            {/* Extra Advice Panel */}
            {report && (
                <div className="glass-card p-8 bg-accent/5 border-accent/20">
                    <div className="flex gap-4 items-start">
                        <InformationCircleIcon className="w-8 h-8 text-accent shrink-0" />
                        <div>
                            <h4 className="font-bold text-accent mb-1">Production Tip</h4>
                            <p className="text-sm text-white/80">Based on your "Low-End Power" score, we recommend referencing <span className="text-primary font-mono">'Titan Echo'</span> from your library. It has a similar sub-bass profile but with 12% more clarity at 50Hz.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
