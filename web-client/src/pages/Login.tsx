import { useState, useEffect } from 'react';
import { Logo } from '../components/Logo';
import {
    EyeIcon,
    EyeSlashIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';

// Social Icon components (outlined)
const GoogleIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11h8.5m-8.5 0v3.5m0-3.5c-3.5 0-6.5-3-6.5-6.5S10 1.5 13.5 1.5c1.8 0 3.5.7 4.7 2l2.3-2.3M12 11v8.5m0-8.5c3.5 0 6.5 3 6.5 6.5S14 22.5 10.5 22.5c-1.8 0-3.5-.7-4.7-2l-2.3 2.3" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
    </svg>
);

const SoundCloudIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V9m-3 10V11m-3 8v-5m-3 5v-3m15 6V7m3 12V5m3 14V9" />
    </svg>
);

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [focus, setFocus] = useState<string | null>(null);
    const [isActivating, setIsActivating] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleActivate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsActivating(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsActivating(false);
            return;
        }

        // Delay for the "Activation Sequence" feeling
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center p-6 select-none font-sans">
            {/* 1. Overall Aesthetic: Dynamic Generative Background */}
            <div className="absolute inset-0 z-0">
                {/* Generative Soundwaves */}
                <svg className="absolute w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0" />
                            <stop offset="50%" stopColor="#00F2FE" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {[...Array(5)].map((_, i) => (
                        <path
                            key={i}
                            d={`M0,${500 + i * 20} Q250,${450 - i * 30} 500,${500 + i * 10} T1000,${500 + i * 20}`}
                            fill="none"
                            stroke="url(#wave-grad)"
                            strokeWidth="1"
                            className="animate-pulse"
                            style={{ animationDelay: `${i * 0.5}s`, animationDuration: `${3 + i}s` }}
                        />
                    ))}
                </svg>

                {/* Neural Network Nodes */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* 2. Layout & Elements: The Floating Pod */}
            <div className={`relative z-10 w-full max-w-[420px] transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}>

                {/* Perimeter Scan Border (Only visible during activation) */}
                {isActivating && (
                    <div className="absolute -inset-[2px] rounded-[22px] overflow-hidden z-[-1]">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary animate-[spin_2s_linear_infinite]" />
                    </div>
                )}

                <div className={`glass-card p-10 shadow-2xl transition-all duration-500 bg-navy/60 backdrop-blur-[20px] border-white/10 ${isActivating ? 'glow-cyan' : 'border-white/10'
                    }`} style={{ borderRadius: '20px' }}>

                    {/* Branding */}
                    <div className="flex justify-center mb-12">
                        <Logo size={56} className="flex-col gap-4" />
                    </div>

                    {/* Activation Sequence Information */}
                    {isActivating && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center rounded-[20px] animate-in fade-in duration-500">
                            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
                            <h3 className="text-xl font-bold tracking-widest text-primary animate-pulse uppercase">Initializing Session</h3>
                            <p className="text-xs text-muted mt-4 font-mono">Syncing neural creative environment...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                            <ExclamationTriangleIcon className="w-5 h-5 text-accent" />
                            <p className="text-xs font-bold text-accent uppercase tracking-wider">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleActivate} className="space-y-10">
                        {/* Email Input: Floating Placeholder */}
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFocus('email')}
                                onBlur={() => setFocus(null)}
                                required
                                className="w-full bg-transparent border-b border-white/10 py-2 outline-none transition-all duration-300 focus:border-primary text-white"
                            />
                            <label className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest ${focus === 'email' || email
                                ? '-top-6 text-[10px] text-primary font-bold'
                                : 'top-2 text-sm text-muted'
                                }`}>
                                Signal Address
                            </label>
                            {/* Animated Focus Line */}
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ${focus === 'email' ? 'w-full shadow-cyan-glow' : 'w-0'
                                }`} />
                        </div>

                        {/* Password Input: Floating Placeholder + Eye Toggle */}
                        <div className="relative group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocus('password')}
                                onBlur={() => setFocus(null)}
                                required
                                className="w-full bg-transparent border-b border-white/10 py-2 pr-10 outline-none transition-all duration-300 focus:border-primary text-white"
                            />
                            <label className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest ${focus === 'password' || password
                                ? '-top-6 text-[10px] text-primary font-bold'
                                : 'top-2 text-sm text-muted'
                                }`}>
                                Security Key
                            </label>

                            {/* Password Toggle Icon */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute right-0 top-2 transition-colors duration-300 ${focus === 'password' ? 'text-primary' : 'text-muted hover:text-primary'
                                    }`}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>

                            {/* Animated Focus Line */}
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ${focus === 'password' ? 'w-full shadow-cyan-glow' : 'w-0'
                                }`} />
                        </div>

                        {/* CTA Button: Activate */}
                        <button
                            type="submit"
                            disabled={isActivating}
                            className="w-full relative py-4 bg-primary text-background font-black uppercase tracking-widest rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-cyan-glow group"
                        >
                            <span className="relative z-10">{isActivating ? '...' : 'Activate'}</span>
                            {/* Inner Acrylic Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </form>

                    {/* Social Logins */}
                    <div className="mt-12 text-center">
                        <div className="relative flex items-center justify-center mb-8">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                            <span className="relative bg-navy/0 px-4 text-[10px] uppercase tracking-[0.2em] text-muted">
                                or activate with
                            </span>
                        </div>

                        <div className="flex justify-center gap-6">
                            {[
                                { id: 'google', component: <GoogleIcon /> },
                                { id: 'github', component: <GitHubIcon /> },
                                { id: 'soundcloud', component: <SoundCloudIcon /> }
                            ].map((social) => (
                                <button
                                    key={social.id}
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-cyan-glow"
                                >
                                    {social.component}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/5 text-center">
                        <p className="text-[10px] font-bold text-muted uppercase tracking-wider">
                            Syncing with local neural nodes v1.0.4
                        </p>
                    </div>
                </div>

                {/* Secondary Actions */}
                <div className="mt-8 flex justify-between px-2 text-[10px] uppercase tracking-widest text-muted/60 font-bold">
                    <a href="#" className="hover:text-primary transition-colors">Recover Signal</a>
                    <a href="/signup" className="hover:text-primary transition-colors">Initialize New Hub</a>
                </div>
            </div>
        </div>
    );
}
