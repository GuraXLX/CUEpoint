import React from 'react';
import { LayoutGrid, Disc, Mic2, Radio, Library as LibraryIcon, Settings, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import Logo from './Logo';

const NavItem = ({ icon: Icon, label, to, active = false }: { icon: any, label: string, to: string, active?: boolean }) => (
    <Link to={to} className={clsx(
        "flex flex-col items-center justify-center w-full py-4 gap-2 transition-all duration-200 group relative",
        active ? "text-primary bg-white/5" : "text-neutral-500 hover:text-white hover:bg-white/5"
    )}>
        {active && (
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary shadow-[0_0_10px_#D4FF00]" />
        )}
        <Icon size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
        <span className="text-[9px] uppercase tracking-widest font-mono hidden xl:block">{label}</span>
    </Link>
);

const Sidebar: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="h-full w-20 xl:w-24 bg-[#080808] border-r border-white/10 flex flex-col items-center py-6 z-30">

            {/* Brand Icon */}
            <div className="mb-8">
                <Logo className="h-8 w-8 text-white" showText={false} />
            </div>

            {/* Navigation Deck */}
            <div className="flex-1 w-full space-y-1">
                <NavItem icon={LayoutGrid} label="Dashboard" to="/dashboard" active={isActive('/dashboard')} />
                <NavItem icon={Disc} label="Decks" to="/setlist-architect" active={isActive('/setlist-architect')} />
                <NavItem icon={Mic2} label="Stems" to="/track-doctor" active={isActive('/track-doctor')} />
                <NavItem icon={Radio} label="Live" to="/collab" active={isActive('/collab')} />
                <NavItem icon={Zap} label="Generate" to="/discovery" active={isActive('/discovery')} />
                <div className="h-px w-10 mx-auto bg-white/10 my-4" />
                <NavItem icon={LibraryIcon} label="Library" to="/library" active={isActive('/library')} />
            </div>

            {/* Bottom Actions */}
            <div className="w-full">
                <NavItem icon={Settings} label="System" to="/settings" active={isActive('/settings')} />
            </div>
        </div>
    );
};

export default Sidebar;
