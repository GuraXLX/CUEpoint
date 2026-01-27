import React from 'react';
import { Plus, MoreHorizontal, Play } from 'lucide-react';

const ProjectCard = ({ title, type, date, color = "bg-primary" }: { title: string, type: string, date: string, color?: string }) => (
    <div className="group relative aspect-video bg-[#111] border border-white/10 rounded-sm overflow-hidden hover:border-white/30 transition-all cursor-pointer">
        {/* Background / Art */}
        <div className={`absolute inset-0 opacity-20 ${color} group-hover:opacity-30 transition-opacity`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[9px] font-mono border border-white/10">{type}</span>
                <button className="text-white hover:text-primary"><MoreHorizontal size={16} /></button>
            </div>

            <div>
                <h3 className="text-xl font-display font-bold text-white mb-1 leading-none">{title}</h3>
                <p className="text-[10px] font-mono text-neutral-400">{date}</p>
            </div>
        </div>

        {/* Hover Play Action */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
            <button className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Play size={20} fill="currentColor" className="ml-1" />
            </button>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <>
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">STUDIO <span className="text-neutral-600">OVERVIEW</span></h1>
                    <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest">Workspace: Main A // Session 442</p>
                </div>

                <div className="flex gap-4">
                    <button className="px-6 py-2 border border-white/10 bg-[#111] hover:bg-[#1A1A1A] text-white font-mono text-xs uppercase tracking-wider transition-colors">
                        Import
                    </button>
                    <button className="px-6 py-2 bg-primary text-black font-mono text-xs uppercase tracking-wider font-bold hover:brightness-110 flex items-center gap-2 transition-all shadow-primary-btn">
                        <Plus size={16} /> New Project
                    </button>
                </div>
            </div>

            {/* Quick Access / Recent */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-display text-white">Recent Projects</h2>
                    <button className="text-[10px] font-mono text-primary uppercase hover:underline">View All</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <ProjectCard title="Neon Nights v3" type="Techno" date="Edited 2h ago" color="bg-blue-500" />
                    <ProjectCard title="Deep Space 9" type="Ambient" date="Edited 5h ago" color="bg-purple-500" />
                    <ProjectCard title="Acid Rain" type="House" date="Edited 1d ago" color="bg-primary" />

                    {/* Create New Placeholder */}
                    <div className="aspect-video border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center gap-3 text-neutral-600 hover:text-white hover:border-white/30 transition-all cursor-pointer group">
                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                            <Plus size={20} />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest">Empty Slot</span>
                    </div>
                </div>
            </div>

            {/* AI Generation Layer */}
            <div>
                <h2 className="text-xl font-display text-white mb-6">Discovery Engine</h2>
                <div className="h-64 border border-white/10 bg-[#0A0A0A] rounded-sm relative overflow-hidden flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity grayscale group-hover:grayscale-0" />
                    <div className="relative z-10 text-center">
                        <h3 className="text-3xl font-display font-bold text-white mb-2">START NEW GENERATION</h3>
                        <p className="text-xs font-mono text-neutral-400">AI-Powered Stem Separation & Composition</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
