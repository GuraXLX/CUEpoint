import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AuthLayout from '../components/AuthLayout';
import TerminalInput from '../components/TerminalInput';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">Check in</h1>
                <p className="text-muted text-sm">Welcome back to the studio.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white text-sm font-medium">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    <span>Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white text-sm font-medium">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05 1.72-3.17 1.72-1.2 0-2.04-1.03-3.03-1.73-.85-.63-2.18-1.55-3.66-1.55-1.56.03-2.9.83-3.8 2.31.25.13.51.27.78.43 1.95 1.17 3.56 2.14 5.67 2.14 1.74 0 3.33-.92 4.46-2.05.62-.62 1.18-1.32 1.68-2.09-.45-.33-.92-.68-1.4-1.07-.17-.11-.35-.22-.53-.33zM12.03 7.25c-.15 2.23 1.66 4.07 3.74 4.25.29-2.33-1.44-4-3.74-4.25zm-2.95 2.5c-2.38.25-4.14 2.26-4.14 4.79 0 3.58 2.81 7.15 6 7.15 1.63 0 2.5-.34 3.52-.92.93.53 1.83.89 3.03.89 2.53 0 4.67-2.34 4.67-4.94 0-2.42-1.63-4.32-3.84-4.59-1.33-.16-2.58.62-3.9 1.77-1.38-1.46-3.33-4.33-5.34-4.15z" />
                    </svg>
                    <span>Apple</span>
                </button>
            </div>

            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-[#050505] px-2 text-muted/40">Or continue with email</span>
                </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-4">
                    <TerminalInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="producer@studio.com"
                    />

                    <div className="space-y-1">
                        <TerminalInput
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••••••"
                        />
                        <div className="flex justify-end pt-1">
                            <a href="#" className="text-xs text-muted hover:text-white transition-colors">Forgot password?</a>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-3 border border-red-500/30 bg-red-500/5 text-red-500 text-xs rounded">
                        {error}
                    </div>
                )}

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-3 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2"
                >
                    {loading ? (
                        <span className="text-sm">Connecting...</span>
                    ) : (
                        <span className="text-sm">Sign In</span>
                    )}
                </motion.button>

                <div className="text-center pt-2">
                    <p className="text-muted text-xs">
                        New here?{' '}
                        <Link to="/signup" className="text-white hover:text-primary transition-colors font-medium">
                            Create an account
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
