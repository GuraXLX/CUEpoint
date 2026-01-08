import { useState, useEffect } from 'react';
import { Logo } from '../components/Logo';
import {
    EyeIcon,
    EyeSlashIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [focus, setFocus] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        setError(null);

        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                }
            }
        });

        if (signUpError) {
            setError(signUpError.message);
            setIsCreating(false);
            return;
        }

        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 2500);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center p-6 font-sans">
            {/* Generative Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className={`relative z-10 w-full max-w-[440px] transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>

                <div className={`glass-card p-10 bg-navy/60 backdrop-blur-[20px] border border-white/10 rounded-[24px] ${isCreating ? 'glow-cyan' : ''}`}>

                    <div className="flex flex-col items-center mb-10">
                        <Logo size={48} />
                        <h2 className="mt-6 text-2xl font-black uppercase tracking-tighter text-white">Initialize Hub</h2>
                        <p className="text-[10px] text-muted font-bold tracking-[0.3em] uppercase mt-2">Activation Sequence v1.0.4</p>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                            <ExclamationTriangleIcon className="w-5 h-5 text-accent" />
                            <p className="text-xs font-bold text-accent uppercase tracking-wider">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-8">
                        <div className="relative group">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setFocus('username')}
                                onBlur={() => setFocus(null)}
                                required
                                className="w-full bg-transparent border-b border-white/10 py-2 outline-none transition-all focus:border-primary text-white"
                            />
                            <label className={`absolute left-0 transition-all pointer-events-none uppercase tracking-widest ${focus === 'username' || username ? '-top-6 text-[10px] text-primary font-bold' : 'top-2 text-sm text-muted'}`}>
                                Producer Handle
                            </label>
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ${focus === 'username' ? 'w-full shadow-cyan-glow' : 'w-0'}`} />
                        </div>

                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFocus('email')}
                                onBlur={() => setFocus(null)}
                                required
                                className="w-full bg-transparent border-b border-white/10 py-2 outline-none transition-all focus:border-primary text-white"
                            />
                            <label className={`absolute left-0 transition-all pointer-events-none uppercase tracking-widest ${focus === 'email' || email ? '-top-6 text-[10px] text-primary font-bold' : 'top-2 text-sm text-muted'}`}>
                                Signal Address
                            </label>
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ${focus === 'email' ? 'w-full shadow-cyan-glow' : 'w-0'}`} />
                        </div>

                        <div className="relative group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocus('password')}
                                onBlur={() => setFocus(null)}
                                required
                                className="w-full bg-transparent border-b border-white/10 py-2 pr-10 outline-none transition-all focus:border-primary text-white"
                            />
                            <label className={`absolute left-0 transition-all pointer-events-none uppercase tracking-widest ${focus === 'password' || password ? '-top-6 text-[10px] text-primary font-bold' : 'top-2 text-sm text-muted'}`}>
                                Security Key
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-2 text-muted hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ${focus === 'password' ? 'w-full shadow-cyan-glow' : 'w-0'}`} />
                        </div>

                        <button
                            type="submit"
                            disabled={isCreating}
                            className="w-full py-4 bg-primary text-background font-black uppercase tracking-widest rounded-xl shadow-cyan-glow hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {isCreating ? 'Synchronizing...' : 'Establish Connection'}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-xs text-muted">
                            Already have an active hub? <a href="/login" className="text-primary font-bold hover:underline">Connect Here</a>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-[10px] text-muted/40 font-bold uppercase tracking-widest">
                    By initializing, you agree to the Neural Network Protocol.
                </div>
            </div>
        </div>
    );
}
