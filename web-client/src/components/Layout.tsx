import { Link, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import {
    Squares2X2Icon,
    SparklesIcon,
    BeakerIcon,
    GlobeAltIcon,
    UserGroupIcon,
    BellIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Squares2X2Icon },
    { name: 'Setlist Architect', href: '/setlist-architect', icon: SparklesIcon },
    { name: 'Track Doctor', href: '/track-doctor', icon: BeakerIcon },
    { name: 'Discovery Engine', href: '/discovery', icon: GlobeAltIcon },
    { name: 'Collab Hub', href: '/collab', icon: UserGroupIcon },
]

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation()

    return (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex flex-col w-72 bg-navy/40 border-r border-white/5 backdrop-blur-xl">
                <div className="p-8">
                    <Logo size={40} />
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                    ? 'bg-primary/10 text-primary glow-neon border border-primary/20'
                                    : 'text-muted hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`h-6 w-6 transition-colors ${isActive ? 'text-primary' : 'group-hover:text-primary'
                                    }`} />
                                <span className="font-medium">{item.name}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-cyan-glow" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 mt-auto">
                    <div className="glass-card p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                            <UserCircleIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">Producer#842</p>
                            <p className="text-xs text-muted truncate">Pro Account</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen overflow-y-auto no-scrollbar">
                {/* Top Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-background/50 backdrop-blur-md sticky top-0 z-20">
                    <div className="lg:hidden">
                        <Logo size={32} />
                    </div>
                    <div className="hidden lg:block">
                        {/* Breadcrumb or Search */}
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted">CuePoint</span>
                            <span className="text-muted">/</span>
                            <span className="text-white font-medium capitalize">
                                {location.pathname.replace('/', '').replace('-', ' ')}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-muted hover:text-white transition-colors">
                            <BellIcon className="h-6 w-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background shadow-pink-glow" />
                        </button>
                        <button className="btn-primary py-2 px-4 text-sm">
                            Upload Signal
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className={`flex-1 w-full mx-auto ${location.pathname.includes('setlist-architect') ? 'h-[calc(100vh-5rem)] p-0 max-w-none' : 'p-8 lg:p-12 max-w-7xl'}`}>
                    {children}
                </main>
            </div>
        </div>
    )
}
