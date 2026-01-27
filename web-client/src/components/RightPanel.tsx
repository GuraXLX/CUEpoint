import React, { useEffect, useState, useRef } from 'react';
import { X, PinOff, AudioWaveform, Sparkles, ShoppingCart, Play, Pause } from 'lucide-react';
import AudioSpectrum from './AudioSpectrum';

interface Track {
    id: number;
    title: string;
    artist: string;
    bpm: number;
    key: string;
    price?: number;
    artwork?: string;
}

interface Recommendations {
    library: Track[];
    marketplace: Track[];
}

interface RightPanelProps {
    onClose?: () => void;
    seedTrackId?: number; // The track we are matching against
}

const RightPanel: React.FC<RightPanelProps> = ({ onClose, seedTrackId }) => {
    const [recs, setRecs] = useState<Recommendations | null>(null);
    const [loading, setLoading] = useState(false);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!seedTrackId) return;

        const fetchRecs = async () => {
            setLoading(true);
            try {
                // In real app: fetch from API
                // const res = await fetch(`/api/discovery/recommend/${seedTrackId}`);
                // const data = await res.json();

                // MOCKING THE RESPONSE for UI Demo since backend might not be fully reachable in browser env easily
                // without proxy. But simulating the structure I built in backend:
                setTimeout(() => {
                    setRecs({
                        library: [
                            { id: 101, title: 'Deep Ocean', artist: 'Aquatic', bpm: 124, key: '8A' },
                            { id: 102, title: 'Warehouse Vibes', artist: 'TechHead', bpm: 125, key: '8A' }
                        ],
                        marketplace: [
                            {
                                id: 103,
                                title: 'Neon Drive',
                                artist: 'Retrowave',
                                bpm: 130,
                                key: '4A',
                                price: 0.99,
                                artwork: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop'
                            },
                            {
                                id: 104,
                                title: 'Future Funk',
                                artist: 'GrooveArmada',
                                bpm: 120,
                                key: '2A',
                                price: 1.25,
                                artwork: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=300&auto=format&fit=crop'
                            },
                            {
                                id: 105,
                                title: 'Acid Rain',
                                artist: 'System 7',
                                bpm: 135,
                                key: '6A',
                                price: 1.99,
                                artwork: 'https://images.unsplash.com/photo-1558470598-a5dda9640f6b?q=80&w=300&auto=format&fit=crop'
                            }
                        ]
                    });
                    setLoading(false);
                }, 800);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };

        fetchRecs();
    }, [seedTrackId]);

    const handlePreview = (trackId: number) => {
        if (playingId === trackId) {
            audioRef.current?.pause();
            setPlayingId(null);
        } else {
            if (audioRef.current) {
                audioRef.current.src = `/api/tracks/${trackId}/stream`; // Backend endpoint
                // Mocking playback for demo if backend unreachable
                // audioRef.current.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 
                audioRef.current.play().catch(e => console.log("Audio play error", e));
                setPlayingId(trackId);
            }
        }
    };

    return (
        <div className="w-80 bg-[#080808] border-l border-white/10 flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
            <audio ref={audioRef} onEnded={() => setPlayingId(null)} />

            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Sparkles size={16} className="text-primary" />
                    <h3 className="text-xs font-display font-bold text-white tracking-wider">SMART DISCOVERY</h3>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-white/10 rounded-sm text-neutral-500 hover:text-white transition-colors"
                >
                    <PinOff size={14} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                {!seedTrackId ? (
                    <div className="text-center text-neutral-500 py-10">
                        <AudioWaveform className="w-8 h-8 mx-auto mb-2 opacity-20" />
                        <p className="text-xs font-mono">SELECT A TRACK TO FIND MATCHES</p>
                    </div>
                ) : loading ? (
                    <div className="space-y-3">
                        <div className="h-20 bg-white/5 rounded animate-pulse" />
                        <div className="h-20 bg-white/5 rounded animate-pulse" />
                        <div className="h-20 bg-white/5 rounded animate-pulse" />
                    </div>
                ) : (
                    <>
                        {/* Library Matches */}
                        <div>
                            <h4 className="text-[10px] font-mono text-primary uppercase mb-3 tracking-widest pl-1 font-bold">From Your Vault</h4>
                            <div className="space-y-3">
                                {recs?.library.map(track => (
                                    <div key={track.id} className="p-3 bg-[#111] border border-white/5 hover:border-primary/40 rounded-sm group transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="truncate pr-2">
                                                <h5 className="font-bold text-sm text-white truncate">{track.title}</h5>
                                                <p className="text-[10px] text-neutral-400">{track.artist}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-bold text-accent bg-accent/10 px-1.5 rounded">{track.key}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <button onClick={() => handlePreview(track.id)} className="p-1.5 bg-white/5 hover:bg-primary hover:text-black rounded-full transition-colors">
                                                {playingId === track.id ? <Pause size={12} /> : <Play size={12} />}
                                            </button>
                                            <span className="text-[10px] font-mono text-neutral-600">{track.bpm} BPM</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Marketplace Matches */}
                        <div>
                            <div className="flex items-center justify-between mb-3 pl-1">
                                <h4 className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold">Marketplace Gems</h4>
                                <span className="text-[9px] bg-white/10 px-1.5 rounded text-white">STORE</span>
                            </div>
                            <div className="space-y-3">
                                {recs?.marketplace.map(track => (
                                    <div key={track.id} className="relative overflow-hidden rounded-lg group h-24 border border-white/10 hover:border-accent/50 transition-all cursor-pointer">
                                        {/* Cinematic Background */}
                                        <div className="absolute inset-0 z-0">
                                            {track.artwork ? (
                                                <img
                                                    src={track.artwork}
                                                    alt={track.title}
                                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 blur-[1px] group-hover:blur-none"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                                        </div>

                                        <div className="relative z-10 p-3 h-full flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h5 className="font-bold text-sm text-white drop-shadow-md">{track.title}</h5>
                                                    <p className="text-[10px] text-gray-300 font-medium drop-shadow">{track.artist}</p>
                                                </div>
                                                <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-accent border border-accent/20">
                                                    ${track.price}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handlePreview(track.id); }}
                                                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-accent text-white hover:text-black flex items-center justify-center backdrop-blur-sm transition-all border border-white/20"
                                                    >
                                                        {playingId === track.id ? <Pause size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" />}
                                                    </button>

                                                    <div className="flex gap-2 text-[9px] font-mono text-gray-300 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
                                                        <span>{track.bpm}</span>
                                                        <span className="text-white/20">|</span>
                                                        <span className={track.key.includes('A') ? 'text-cyan-400' : 'text-pink-400'}>{track.key}</span>
                                                    </div>
                                                </div>

                                                <button className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 px-3 py-1 bg-accent text-black text-[9px] font-bold uppercase rounded hover:bg-white hover:scale-105">
                                                    <ShoppingCart size={10} />
                                                    Buy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RightPanel;
