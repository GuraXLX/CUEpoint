import { useState } from 'react';
import { GlobeAltIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, PlayIcon } from '@heroicons/react/24/outline';

const MOCK_MARKETPLACE = [
    {
        id: 1,
        title: 'Quantum Drift',
        artist: 'Sub_Zero',
        genre: 'Industrial Techno',
        bpm: 128,
        score: 'A',
        energy: 92,
        price: 'FREE',
        artwork: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Nebula',
        artist: 'Void Walker',
        genre: 'Melodic House',
        bpm: 122,
        score: 'A-',
        energy: 65,
        price: '$2.00',
        artwork: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Static Pulse',
        artist: 'Circuit Soul',
        genre: 'Techno',
        bpm: 130,
        score: 'B+',
        energy: 88,
        price: '$5.00',
        artwork: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'Liquid Gold',
        artist: 'Aura',
        genre: 'Organic House',
        bpm: 118,
        score: 'A',
        energy: 45,
        price: '$3.50',
        artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 5,
        title: 'The Architect',
        artist: 'Gura',
        genre: 'Peak Time Techno',
        bpm: 132,
        score: 'A+',
        energy: 98,
        price: 'FREE',
        artwork: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 6,
        title: 'Midnight Signal',
        artist: 'Neon Void',
        genre: 'Prog House',
        bpm: 124,
        score: 'A-',
        energy: 75,
        price: '$4.00',
        artwork: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 7, title: 'Cyber City', artist: 'Neon Glide', genre: 'Synthwave', bpm: 110, score: 'B+', energy: 60, price: '$1.99',
        artwork: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 8, title: 'Deep Space', artist: 'Galactic', genre: 'Ambient', bpm: 90, score: 'A', energy: 30, price: 'FREE',
        artwork: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 9, title: 'Rhythm Sys', artist: 'Beat Mech', genre: 'Tech House', bpm: 126, score: 'A+', energy: 85, price: '$6.00',
        artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 10, title: 'Echo Chamber', artist: 'Dub Monitor', genre: 'Dub Techno', bpm: 118, score: 'B', energy: 55, price: '$2.50',
        artwork: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 11, title: 'Solar Wind', artist: 'Stellar', genre: 'Trance', bpm: 138, score: 'A-', energy: 95, price: '$3.99',
        artwork: 'https://images.unsplash.com/photo-1532431149956-6a2c20847998?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 12, title: 'Mainframe', artist: 'Binary', genre: 'Glitch', bpm: 140, score: 'B+', energy: 88, price: '$4.50',
        artwork: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop'
    }
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
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
                    {MOCK_MARKETPLACE.map((track) => (
                        <div key={track.id} className="relative group overflow-hidden rounded-xl aspect-square border border-white/5 hover:border-primary/50 transition-all duration-300 shadow-lg cursor-pointer">

                            {/* Artwork */}
                            <img
                                src={track.artwork}
                                alt={track.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-40"
                            />

                            {/* Dark Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                            {/* Top Badges (Always Visible) */}
                            <div className="absolute top-2 right-2 z-20">
                                <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black text-white border border-white/10 shadow-sm">
                                    {track.score}
                                </div>
                            </div>

                            {/* Center Action (Hover Only) */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 transform scale-90 group-hover:scale-100">
                                <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                    <PlayIcon className="w-5 h-5 ml-0.5" />
                                </div>
                            </div>

                            {/* Bottom Info (Always Visible but Shifts) */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 z-20 transition-transform duration-300 group-hover:-translate-y-1">
                                <div className="flex justify-between items-end mb-1">
                                    <div className="truncate pr-2">
                                        <h3 className="text-sm font-bold text-white truncate drop-shadow-md leading-tight">{track.title}</h3>
                                        <p className="text-[10px] text-gray-300 font-medium uppercase tracking-wider truncate">{track.artist}</p>
                                    </div>
                                </div>

                                {/* Hover Extras */}
                                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-between pt-2 border-t border-white/10 mt-2">
                                    <span className="font-mono text-[10px] text-primary font-bold">{track.bpm} BPM</span>
                                    <span className="text-xs font-bold text-white">{track.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
