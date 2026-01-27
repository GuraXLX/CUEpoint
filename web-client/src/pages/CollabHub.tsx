import { useState } from 'react';
import {
    ChatBubbleLeftRightIcon,
    UserGroupIcon,
    FolderIcon,
    PaperAirplaneIcon,
    HashtagIcon
} from '@heroicons/react/24/outline';

const FORUM_CHANNELS = [
    { name: 'production-tips', active: true },
    { name: 'feedback-loop', active: false },
    { name: 'collab-requests', active: false },
    { name: 'market-signals', active: false },
];

const MOCK_MESSAGES = [
    { id: 1, user: 'Neon_Void', avatar: 'N', text: 'Yo, that track doctor score on Nebula was sick. Want to collab?', time: '2h ago' },
    { id: 2, user: 'Gura', avatar: 'G', text: 'I am down. Have some stems for a heavy industrial kick.', time: '1h ago' },
];

export default function CollabHub() {
    const [activeTab, setActiveTab] = useState('forum');
    const [message, setMessage] = useState('');

    return (
        <div className="flex h-[calc(100vh-12rem)] glass-card border-white/5 overflow-hidden animate-in slide-in-from-bottom-6 duration-700">
            {/* Internal Navigation Sidebar */}
            <aside className="w-64 border-r border-white/5 flex flex-col bg-background/20">
                <div className="p-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <UserGroupIcon className="w-6 h-6 text-primary" />
                        Hub
                    </h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { id: 'forum', icon: HashtagIcon, label: 'Signals Forum' },
                        { id: 'projects', icon: FolderIcon, label: 'Active Projects' },
                        { id: 'messages', icon: ChatBubbleLeftRightIcon, label: 'Direct Signals' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'text-muted hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-bold text-sm tracking-wide">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Feature View */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Top Bar for Tab */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-background/10">
                    <h3 className="font-bold capitalize">{activeTab}</h3>
                    <div className="flex gap-4">
                        <div className="flex -space-x-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-navy border-2 border-background flex items-center justify-center text-[10px] font-bold">
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary">
                                +12
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
                    {activeTab === 'forum' && (
                        <div className="flex gap-8 h-full">
                            <div className="w-48 space-y-2 shrink-0">
                                {FORUM_CHANNELS.map((ch) => (
                                    <button key={ch.name} className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${ch.active ? 'text-primary' : 'text-muted hover:text-white transition-colors'}`}>
                                        # {ch.name}
                                    </button>
                                ))}
                            </div>
                            <div className="flex-1 space-y-6">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="glass-card p-6 border-white/5 hover:border-primary/20 transition-colors group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-lg group-hover:text-primary transition-colors cursor-pointer">Best practices for vLLM track generation?</h4>
                                                <p className="text-xs text-muted mt-1">u/CodeBeats • 4 hours ago in #production-tips</p>
                                            </div>
                                            <div className="bg-navy px-3 py-1 rounded-full text-xs font-bold text-muted">12 replies</div>
                                        </div>
                                        <p className="text-sm text-white/70">Has anyone experimented with the Llama 3 models for generating transitions? I'm getting mixed results with the filter sweep suggestions...</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div className="max-w-3xl mx-auto space-y-6 h-full flex flex-col justify-end">
                            {MOCK_MESSAGES.map((msg) => (
                                <div key={msg.id} className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary border border-primary/20">
                                        {msg.avatar}
                                    </div>
                                    <div className="glass-card p-4 border-white/5 flex-1 max-w-[80%]">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold text-primary">{msg.user}</span>
                                            <span className="text-[10px] text-muted">{msg.time}</span>
                                        </div>
                                        <p className="text-sm text-white/90">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {['Sub-Frequency Pulse', 'Techno Genesis', 'Neon Nightset'].map((proj, i) => (
                                <div key={i} className="glass-card p-8 border-white/5 hover:glow-neon transition-all group">
                                    <div className="flex justify-between items-center mb-4">
                                        <FolderIcon className="w-8 h-8 text-primary opacity-60 group-hover:opacity-100" />
                                        <div className="text-[10px] font-bold px-2 py-0.5 bg-green-500/10 text-green-500 rounded border border-green-500/20">Active</div>
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">{proj}</h4>
                                    <p className="text-xs text-muted mb-6">Last sync: 12 mins ago • 3 Contributors</p>
                                    <div className="h-1.5 w-full bg-navy rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '65%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Message Input (Context Sensitive) */}
                <footer className="p-6 border-t border-white/5 bg-background/20">
                    <div className="relative">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={`Signal your intent to #${activeTab === 'forum' ? 'production-tips' : 'Neon_Void'}...`}
                            className="w-full bg-navy/40 border border-white/5 rounded-2xl py-4 pl-6 pr-16 outline-none focus:glow-neon focus:border-primary/40 transition-all"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary p-2 rounded-xl text-background hover:scale-110 active:scale-95 transition-all shadow-cyan-glow">
                            <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}
