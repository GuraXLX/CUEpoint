import React from 'react';
import { motion } from 'framer-motion';

interface TerminalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ label, ...props }) => {
    return (
        <div className="group relative">
            <label className="block text-xs font-medium text-muted mb-1.5 ml-1 transition-colors group-focus-within:text-primary">
                {label}
            </label>
            <div className="relative">
                <input
                    {...props}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/60 transition-colors placeholder:text-white/20 font-sans"
                />
                {/* Subtle glow effect on focus */}
                <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500" />
            </div>
        </div>
    );
};

export default TerminalInput;
