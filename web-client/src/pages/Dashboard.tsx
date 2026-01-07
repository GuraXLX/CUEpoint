import { Link } from 'react-router-dom'
import { CountingNumber } from '../components/CountingNumber'
import {
    SparklesIcon,
    BeakerIcon,
    GlobeAltIcon,
    UserGroupIcon,
    ChartBarIcon,
    PlayIcon,
    UserIcon
} from '@heroicons/react/24/outline'

export default function Dashboard() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header / Welcome */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                        System Status: <span className="text-primary">Operational</span>
                    </h1>
                    <p className="text-muted">Welcome back, Commander. Your creative ecosystem is synced.</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-card px-6 py-3 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium">Stage Ready</span>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Cloud Storage', value: 85, suffix: '%', icon: ChartBarIcon, color: 'text-primary' },
                    { label: 'Tracks Analyzed', value: 142, suffix: '', icon: BeakerIcon, color: 'text-accent' },
                    { label: 'Setlist Flow', value: 98, suffix: '%', icon: PlayIcon, color: 'text-green-500' },
                    { label: 'Collaborators', value: 12, suffix: '', icon: UserIcon, color: 'text-blue-500' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 flex items-center justify-between group hover:glow-cyan transition-all duration-300">
                        <div>
                            <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                            <div className="text-3xl font-bold">
                                <CountingNumber value={stat.value} suffix={stat.suffix} />
                            </div>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                    </div>
                ))}
            </div>

            {/* Module Access Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {/* Setlist Architect */}
                <Link to="/setlist-architect" className="glass-card p-8 group relative overflow-hidden transition-all duration-500 hover:glow-cyan border-white/5">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <SparklesIcon className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <SparklesIcon className="w-8 h-8 text-primary shadow-cyan-glow" />
                            </div>
                            <h2 className="text-2xl font-bold">Setlist Architect</h2>
                        </div>
                        <p className="text-muted mb-8 max-w-sm">
                            Model harmonic energy flows and construct perfect 90-minute sets using Camelot notation logic.
                        </p>
                        <div className="flex items-center gap-2 text-primary font-bold group-hover:translate-x-2 transition-transform">
                            Enter Module <span className="text-lg">→</span>
                        </div>
                    </div>
                </Link>

                {/* Track Doctor */}
                <Link to="/track-doctor" className="glass-card p-8 group relative overflow-hidden transition-all duration-500 hover:glow-pink border-white/5">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <BeakerIcon className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-accent/10 rounded-xl">
                                <BeakerIcon className="w-8 h-8 text-accent shadow-pink-glow" />
                            </div>
                            <h2 className="text-2xl font-bold">Track Doctor</h2>
                        </div>
                        <p className="text-muted mb-8 max-w-sm">
                            Submit your mixes for AI-driven spectral analysis and objective mix-quality report cards.
                        </p>
                        <div className="flex items-center gap-2 text-accent font-bold group-hover:translate-x-2 transition-transform">
                            Enter Module <span className="text-lg">→</span>
                        </div>
                    </div>
                </Link>

                {/* Discovery Engine */}
                <Link to="/discovery" className="glass-card p-8 group relative overflow-hidden transition-all duration-500 hover:glow-cyan border-white/5">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <GlobeAltIcon className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <GlobeAltIcon className="w-8 h-8 text-blue-500 shadow-lg" />
                            </div>
                            <h2 className="text-2xl font-bold">Discovery Engine</h2>
                        </div>
                        <p className="text-muted mb-8 max-w-sm">
                            Unearth AI-vetted gems from our curated marketplace of high-fidelity underground signals.
                        </p>
                        <div className="flex items-center gap-2 text-blue-500 font-bold group-hover:translate-x-2 transition-transform">
                            Enter Module <span className="text-lg">→</span>
                        </div>
                    </div>
                </Link>

                {/* Collab Hub */}
                <Link to="/collab" className="glass-card p-8 group relative overflow-hidden transition-all duration-500 hover:shadow-green-500/20 shadow-xl border-white/5 hover:border-green-500">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <UserGroupIcon className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-500/10 rounded-xl">
                                <UserGroupIcon className="w-8 h-8 text-green-500 shadow-lg" />
                            </div>
                            <h2 className="text-2xl font-bold">Collab Hub</h2>
                        </div>
                        <p className="text-muted mb-8 max-w-sm">
                            Command your projects, secure file transfers, and engage with the global community.
                        </p>
                        <div className="flex items-center gap-2 text-green-500 font-bold group-hover:translate-x-2 transition-transform">
                            Enter Module <span className="text-lg">→</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
