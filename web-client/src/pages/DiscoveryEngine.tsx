import { useState } from 'react';
import { GlobeAltIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, PlayIcon } from '@heroicons/react/24/outline';

const MOCK_MARKETPLACE = [
    { id: 1, title: 'Quantum Drift', artist: 'Sub_Zero', genre: 'Industrial Techno', bpm: 128, score: 'A', energy: 92, price: 'FREE' },
    { id: 2, title: 'Nebula', artist: 'Void Walker', genre: 'Melodic House', bpm: 122, score: 'A-', energy: 65, price: '$2.00' },
    { id: 3, title: 'Static Pulse', artist: 'Circuit Soul', genre: 'Techno', bpm: 130, score: 'B+', energy: 88, price: '$5.00' },
    { id: 4, title: 'Liquid Gold', artist: 'Aura', genre: 'Organic House', bpm: 118, score: 'A', energy: 45, price: '$3.50' },
    { id: 5, title: 'The Architect', artist: 'Gura', genre: 'Peak Time Techno', bpm: 132, score: 'A+', energy: 98, price: 'FREE' },
    { id: 6, title: 'Midnight Signal', artist: 'Neon Void', genre: 'Prog House', bpm: 124, score: 'A-', energy: 75, price: '$4.00' },
];

export default function DiscoveryEngine() {
    const [search, setSearch] = useState('');

    return (
        <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">DISCOVERY <span className="text-neutral-600">ENGINE</span></h1>
                    <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest">Workspace: Main A // Session 442</p>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
                <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <input
                        placeholder="Search by artist, genre, or mood..."
                        className="w-full bg-[#111] border border-white/10 rounded-sm py-3 pl-12 pr-4 outline-none focus:border-white/30 transition-all font-mono text-sm uppercase tracking-wide text-white placeholder:text-neutral-600"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="px-6 py-3 border border-white/10 bg-[#111] hover:bg-[#1A1A1A] text-white font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-3">
                    <AdjustmentsHorizontalIcon className="w-4 h-4 text-primary" />
                    <span>Advanced</span>
                </button>
            </div>

            {/* Recommended Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-6 bg-primary rounded-full" />
                    <h2 className="text-xl font-bold uppercase tracking-widest text-white">AI Seed Recommendations</h2>
                </div>
                <div className="glass-card p-2 border-white/5 overflow-hidden">
                    <div className="bg-primary/5 p-8 rounded-xl flex items-center justify-between group cursor-pointer">
                        <div className="flex gap-6 items-center">
                            <div className="w-20 h-20 bg-navy rounded-xl flex items-center justify-center shadow-cyan-glow border border-primary/20 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                                <PlayIcon className="w-10 h-10 text-primary relative z-10 group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-primary uppercase tracking-tighter">Matches your Peak Setlist</span>
                                <h3 className="text-2xl font-black mt-1">Cosmic Interference</h3>
                                <p className="text-muted">Acid Techno • 134 BPM • 11A Key</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black text-white">A+</div>
                            <div className="text-xs font-bold text-muted uppercase">Doctor Score</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Grid */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-6 bg-accent rounded-full" />
                    <h2 className="text-xl font-bold uppercase tracking-widest text-white">Marketplace Signals</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_MARKETPLACE.map((track) => (
                        <div key={track.id} className="glass-card p-6 group hover:glow-neon transition-all duration-500 border-white/5 relative">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-navy rounded-xl border border-white/5 group-hover:glow-neon transition-all">
                                    <PlayIcon className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-black text-white leading-none">{track.score}</div>
                                    <div className="text-[10px] font-bold text-muted uppercase mt-1">Grade</div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors truncate">{track.title}</h3>
                                <p className="text-sm text-muted">{track.artist}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-navy/60 p-2 rounded-lg text-center">
                                    <div className="text-[10px] text-muted uppercase font-bold">BPM</div>
                                    <div className="font-mono text-sm">{track.bpm}</div>
                                </div>
                                <div className="bg-navy/60 p-2 rounded-lg text-center">
                                    <div className="text-[10px] text-muted uppercase font-bold">Energy</div>
                                    <div className="font-mono text-sm">{track.energy}%</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">{track.price}</span>
                                <button className="btn-primary py-2 px-4 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    Acquire Signal
                                </button>
                            </div>

                            {/* Tag */}
                            <div className="absolute top-4 right-16 px-2 py-0.5 bg-accent/10 border border-accent/20 rounded text-[9px] font-bold text-accent uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                {track.genre}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
