import React from 'react';
import { X, PinOff, AudioWaveform } from 'lucide-react';
import AudioSpectrum from './AudioSpectrum';

interface RightPanelProps {
    onClose?: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ onClose }) => {
    return (
        <div className="w-80 bg-[#080808] border-l border-white/10 flex flex-col h-full animate-in slide-in-from-right-4 duration-300">

            {/* Header with Unpin/Close */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <AudioWaveform size={16} className="text-primary" />
                    <h3 className="text-xs font-display font-bold text-white tracking-wider">QUEUE & CONTEXT</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-white/10 rounded-sm text-neutral-500 hover:text-white transition-colors"
                        title="Unpin / Close Panel"
                    >
                        <PinOff size={14} />
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="bg-[#111] border border-white/10 p-2 rounded-sm flex items-center">
                    <input type="text" placeholder="SEARCH_QUEUE..." className="bg-transparent border-none outline-none text-[10px] font-mono text-white w-full placeholder:text-neutral-600 uppercase" />
                </div>
            </div>

            {/* Live Generation Queue */}
            <div className="flex-1 p-4 overflow-hidden flex flex-col">
                <h4 className="text-[10px] font-mono text-neutral-600 uppercase mb-3 tracking-widest pl-1">Active Processes</h4>

                <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                    {/* Active Job */}
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm relative overflow-hidden group hover:border-primary/40 transition-colors cursor-pointer">
                        <div className="absolute top-0 left-0 bottom-0 w-[60%] bg-primary/5" />
                        <div className="relative z-10 w-full">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-white uppercase truncate pr-2">Analyzing Stems</span>
                                <span className="text-[9px] font-mono text-primary animate-pulse shrink-0">RUNNING</span>
                            </div>
                            <div className="text-[10px] font-mono text-neutral-400 mb-2 truncate">track_demo_v4.wav</div>
                            {/* Tiny Spectrum */}
                            <div className="h-6 opacity-50">
                                <AudioSpectrum />
                            </div>
                        </div>
                    </div>

                    {/* Queued Jobs */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-sm opacity-50 hover:opacity-80 transition-opacity cursor-pointer">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-neutral-300 uppercase">Batch Export #{890 + i}</span>
                                <span className="text-[9px] font-mono text-neutral-500">WAITING</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default RightPanel;
