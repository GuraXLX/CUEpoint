import { useState } from 'react'
import { Logo } from '../components/Logo'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [focused, setFocused] = useState<string | null>(null)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        window.location.href = '/dashboard'
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center p-6">
            {/* Generative Background Animation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 1000 1000">
                        <path d="M0,500 Q250,400 500,500 T1000,500" fill="none" stroke="#00F2FE" strokeWidth="1" className="animate-pulse" />
                        <path d="M0,600 Q250,500 500,600 T1000,600" fill="none" stroke="#FF3366" strokeWidth="1" className="animate-pulse-slow" />
                    </svg>
                </div>
            </div>

            {/* Login Pod */}
            <div className="relative z-10 w-full max-w-md glass-card p-10 shadow-2xl animate-in fade-in zoom-in duration-700">
                <div className="flex justify-center mb-10">
                    <Logo size={64} className="flex-col" />
                </div>

                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="relative group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            className={`w-full bg-transparent border-b-2 py-2 outline-none transition-all duration-300 ${focused === 'email' || email ? 'border-primary' : 'border-white/10'
                                }`}
                        />
                        <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused === 'email' || email
                                ? '-top-6 text-xs text-primary'
                                : 'top-2 text-muted'
                            }`}>
                            Email Address
                        </label>
                        {focused === 'email' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-in slide-in-from-left duration-300 shadow-cyan-glow" />}
                    </div>

                    <div className="relative group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocused('password')}
                            onBlur={() => setFocused(null)}
                            className={`w-full bg-transparent border-b-2 py-2 outline-none transition-all duration-300 ${focused === 'password' || password ? 'border-primary' : 'border-white/10'
                                }`}
                        />
                        <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused === 'password' || password
                                ? '-top-6 text-xs text-primary'
                                : 'top-2 text-muted'
                            }`}>
                            Password
                        </label>
                        {focused === 'password' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-in slide-in-from-left duration-300 shadow-cyan-glow" />}
                    </div>

                    <button
                        type="submit"
                        className="w-full relative overflow-hidden group btn-primary mt-4"
                    >
                        <span className="relative z-10">Ignition</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <div className="flex items-center justify-between text-xs text-muted mt-6">
                        <a href="#" className="hover:text-primary transition-colors">Forgot Password?</a>
                        <a href="#" className="hover:text-primary transition-colors">Create Account</a>
                    </div>
                </form>
            </div>
        </div>
    )
}
