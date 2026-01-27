import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, Play, Heart, Clock, ArrowUpDown, Database, Folder, Hash, LayoutGrid, List } from 'lucide-react';

// Mock Data
// Mock Data
const LIBRARY_DATA = [
    { id: 1, title: 'Neon Nights', artist: 'CyberVoid', album: 'System Shock', key: '08A', bpm: 128, genre: 'Synthwave', added: '2h ago', duration: '03:45', artwork: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop' },
    { id: 2, title: 'Hyper Reality', artist: 'Nexus', album: 'Core', key: '05A', bpm: 140, genre: 'Trance', added: '5h ago', duration: '06:12', artwork: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=600&auto=format&fit=crop' },
    { id: 3, title: 'Deep Dive', artist: 'Aquatic', album: 'Submerge', key: '11B', bpm: 124, genre: 'Deep House', added: '1d ago', duration: '05:30', artwork: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop' },
    { id: 4, title: 'Glitch Protocol', artist: 'Error_404', album: 'Debug', key: '02A', bpm: 150, genre: 'Dubstep', added: '2d ago', duration: '04:15', artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop' },
    { id: 5, title: 'Solar Flare', artist: 'Stellar', album: 'Cosmos', key: '09B', bpm: 132, genre: 'Techno', added: '3d ago', duration: '07:00', artwork: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=600&auto=format&fit=crop' },
    { id: 6, title: 'Ghost in the Machine', artist: 'Spectre', album: 'Haunt', key: '04A', bpm: 174, genre: 'DnB', added: '4d ago', duration: '05:45', artwork: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=600&auto=format&fit=crop' },
    { id: 7, title: 'Acid Rain', artist: 'Corrosion', album: 'Downpour', key: '10B', bpm: 135, genre: 'Acid', added: '1w ago', duration: '06:20', artwork: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop' },
    { id: 8, title: 'Velvet Sky', artist: 'Lumina', album: 'Horizon', key: '01A', bpm: 120, genre: 'Chill', added: '1w ago', duration: '04:50', artwork: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop' },
];

const Library: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scanStatus, setScanStatus] = useState('IDLE');
    const [showImport, setShowImport] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    const handleImport = () => {
        setShowImport(false);
        setIsScanning(true);
        setScanStatus('INITIALIZING_CORE');
        setScanProgress(0);

        // Simulation Sequence
        setTimeout(() => { setScanStatus('HULL_INTEGRITY_CHECK'); setScanProgress(10); }, 1000);
        setTimeout(() => { setScanStatus('DECRYPTING_AUDIO_STREAMS'); setScanProgress(30); }, 2500);
        setTimeout(() => { setScanStatus('FFT_ANALYSIS_IN_PROGRESS'); setScanProgress(50); }, 4000);
        setTimeout(() => { setScanStatus('CALCULATING_BPM_KEY'); setScanProgress(75); }, 6000);
        setTimeout(() => { setScanStatus('SYNCING_TO_HOLOGRAPHIC_DB'); setScanProgress(90); }, 7500);
        setTimeout(() => {
            setIsScanning(false);
            setScanStatus('COMPLETE');
            // In a real app, we'd refresh the data here
        }, 9000);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex-1 h-full bg-[#050505] flex items-center justify-center flex-col gap-4">
                <div className="w-12 h-12 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
                <div className="font-mono text-xs text-primary animate-pulse tracking-widest">INITIALIZING_VAULT...</div>
            </div>
        );
    }

    if (isScanning) {
        return (
            <div className="flex-1 h-full bg-[#050505] flex items-center justify-center flex-col gap-8 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,254,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                <div className="text-center z-10 space-y-4">
                    <div className="bg-black/50 backdrop-blur border border-primary/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.1)]">
                        <Database className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
                        <h2 className="text-2xl font-display text-white tracking-widest mb-2">SYSTEM SCAN IN PROGRESS</h2>
                        <div className="font-mono text-primary text-sm tracking-widest animate-pulse uppercase">{scanStatus}</div>

                        <div className="w-64 h-2 bg-[#111] rounded-full mt-6 overflow-hidden mx-auto border border-white/10">
                            <div className="h-full bg-primary transition-all duration-300 ease-out shadow-[0_0_20px_#00F2FE]" style={{ width: `${scanProgress}%` }} />
                        </div>
                        <div className="mt-2 text-right font-mono text-xs text-neutral-500">{scanProgress}%</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 h-full bg-[#050505] p-6 overflow-hidden flex flex-col font-sans animate-in fade-in duration-500 relative">

            {/* Import Overlay Modal */}
            {showImport && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8 animate-in fade-in duration-200">
                    <div className="bg-[#0A0A0A] border border-white/10 p-1 rounded-xl shadow-2xl max-w-2xl w-full">
                        <div className="bg-[#050505] border border-white/5 rounded-lg p-12 text-center border-dashed border-2 border-neutral-800 hover:border-primary/50 transition-colors group cursor-pointer" onClick={handleImport}>
                            <div className="w-20 h-20 bg-[#111] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                                <Folder size={32} className="text-neutral-500 group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-xl text-white font-bold mb-2">Drop Audio Files Here</h3>
                            <p className="text-neutral-500 text-sm mb-6 max-w-sm mx-auto">Upload your FLAC, WAV, or MP3 library. The system will automatically analyze Key, BPM, and Sonic Fingerprint.</p>
                            <button className="px-6 py-2 bg-primary text-black font-bold rounded hover:bg-white transition-colors text-xs uppercase tracking-widest">
                                Start Analysis
                            </button>
                        </div>
                        <div className="text-center mt-4">
                            <button onClick={() => setShowImport(false)} className="text-xs font-mono text-neutral-500 hover:text-white uppercase tracking-widest">Cancel</button>
                        </div>
                    </div>
                    {/* Close Area */}
                    <div className="absolute inset-0 -z-10" onClick={() => setShowImport(false)} />
                </div>
            )}

            {/* Header Section */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-display text-white tracking-tight text-shadow-glow mb-2">MASTER VAULT</h1>
                    <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono uppercase tracking-widest">
                        <Database size={12} className="text-primary" />
                        <span>Connected to Local Core</span>
                        <span className="text-neutral-700">|</span>
                        <span>8,420 Tracks</span>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex bg-[#111] p-1 rounded-lg border border-white/10">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded transition-all ${viewMode === 'list' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-neutral-500 hover:text-white'}`}
                        >
                            <List size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-neutral-500 hover:text-white'}`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                    </div>

                    <button
                        onClick={() => setShowImport(true)}
                        className="h-10 px-6 bg-[#111] border border-white/10 hover:border-primary/50 text-white rounded-sm font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 group"
                    >
                        <Folder size={14} className="text-neutral-500 group-hover:text-primary transition-colors" />
                        Import Music
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-[#0A0A0A] border border-white/5 p-2 rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-xl group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 group-hover:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="SEARCH_DB..."
                            className="w-full bg-[#050505] border border-white/5 rounded-md py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors font-mono placeholder:text-neutral-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* Filter Tags */}
                    <div className="flex gap-2">
                        {['KEY', 'BPM', 'GENRE', 'RATING'].map((tag, i) => (
                            <button key={tag} className="px-3 py-1.5 rounded bg-[#111] border border-white/5 text-[10px] font-bold text-neutral-400 hover:text-white hover:border-white/20 transition-all font-mono" style={{ animationDelay: `${i * 100}ms` }}>
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2 px-2">
                    <button className="p-2 hover:bg-white/5 rounded text-neutral-500 hover:text-white transition-colors"><ArrowUpDown size={16} /></button>
                    <button className="p-2 hover:bg-white/5 rounded text-neutral-500 hover:text-white transition-colors"><Filter size={16} /></button>
                </div>
            </div>

            {/* Data Display */}
            <div className={`flex-1 rounded-lg ${viewMode === 'list' ? 'border border-white/5 bg-[#080808] flex flex-col' : 'overflow-y-auto custom-scrollbar'}  overflow-hidden `}>

                {viewMode === 'list' ? (
                    <>
                        {/* Header Row */}
                        <div className="grid grid-cols-[48px_2fr_1.5fr_100px_80px_120px_100px_80px_48px] gap-4 p-3 border-b border-white/10 bg-[#0A0A0A] text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider sticky top-0 z-10">
                            <div className="text-center">#</div>
                            <div>Title</div>
                            <div>Artist</div>
                            <div>Key</div>
                            <div>BPM</div>
                            <div>Genre</div>
                            <div>Added</div>
                            <div className="text-right">Time</div>
                            <div></div>
                        </div>

                        {/* Rows */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {LIBRARY_DATA.map((track, i) => (
                                <div key={track.id} className="grid grid-cols-[48px_2fr_1.5fr_100px_80px_120px_100px_80px_48px] gap-4 p-3 border-b border-white/5 hover:bg-white/5 transition-colors group items-center text-sm animate-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}>
                                    <div className="text-center font-mono text-neutral-600 group-hover:text-primary transition-colors flex justify-center">
                                        <span className="group-hover:hidden">{i + 1}</span>
                                        <Play size={12} className="hidden group-hover:block fill-current" />
                                    </div>

                                    <div className="font-medium text-white truncate flex items-center gap-3">
                                        <img src={track.artwork} className="w-8 h-8 rounded object-cover opacity-50 group-hover:opacity-100 transition-opacity" alt="" />
                                        {track.title}
                                    </div>

                                    <div className="text-neutral-400 truncate group-hover:text-neutral-200 transition-colors">{track.artist}</div>

                                    <div>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${track.key.includes('A') ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                                            }`}>
                                            {track.key}
                                        </span>
                                    </div>

                                    <div className="font-mono text-neutral-300">{track.bpm}</div>

                                    <div className="text-xs text-neutral-500 uppercase tracking-wide border border-white/5 px-2 py-0.5 rounded w-fit">{track.genre}</div>

                                    <div className="text-xs text-neutral-600">{track.added}</div>

                                    <div className="text-right font-mono text-neutral-500">{track.duration}</div>

                                    <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-neutral-500 hover:text-white transition-colors"><MoreHorizontal size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 pb-20">
                        {LIBRARY_DATA.map((track, i) => (
                            <div key={track.id} className="relative group overflow-hidden rounded-xl aspect-square border border-white/5 hover:border-primary/50 transition-all duration-300 shadow-lg cursor-pointer bg-[#0A0A0A] animate-in zoom-in-95 duration-500" style={{ animationDelay: `${i * 50}ms` }}>

                                {/* Artwork */}
                                <img
                                    src={track.artwork}
                                    alt={track.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-40"
                                />

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                                {/* Top Badges */}
                                <div className="absolute top-2 right-2 z-20 flex gap-1">
                                    <div className={`bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono font-bold border border-white/10 shadow-sm ${track.key.includes('A') ? 'text-pink-400' : 'text-cyan-400'}`}>
                                        {track.key}
                                    </div>
                                </div>

                                {/* Center Action */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 transform scale-90 group-hover:scale-100">
                                    <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                                    </div>
                                </div>

                                {/* Bottom Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 z-20 transition-transform duration-300 group-hover:-translate-y-1">
                                    <div className="flex justify-between items-end mb-1">
                                        <div className="truncate pr-2 w-full">
                                            <h3 className="text-sm font-bold text-white truncate drop-shadow-md leading-tight">{track.title}</h3>
                                            <p className="text-[10px] text-gray-300 font-medium uppercase tracking-wider truncate">{track.artist}</p>
                                        </div>
                                    </div>

                                    {/* Hover Extras */}
                                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-between pt-2 border-t border-white/10 mt-2">
                                        <span className="font-mono text-[10px] text-primary font-bold">{track.bpm} BPM</span>
                                        <span className="text-[10px] font-bold text-neutral-400">{track.genre}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Footer */}
            <div className="mt-2 flex justify-between items-center text-[10px] font-mono text-neutral-600">
                <div>SELECTED: 0 TRK</div>
                <div className="flex gap-4">
                    <span>SSD: 1.2TB FREE</span>
                    <span>LIB_V: 2.4.1</span>
                </div>
            </div>

        </div>
    );
};

export default Library;
