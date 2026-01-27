import React, { useState } from 'react';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';
import RightPanel from './RightPanel';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

    return (
        <div className="h-screen w-screen bg-[#050505] text-white font-sans overflow-hidden flex flex-col">

            {/* Main Workspace (Sidebar + Content + RightPanel) */}
            <div className="flex-1 flex overflow-hidden">

                {/* Navigation */}
                <Sidebar />

                {/* Center Canvas */}
                <main className="flex-1 relative overflow-y-auto bg-[#030303] bg-noise">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
                    />
                    <div className="relative z-10 p-8 lg:p-12">
                        {children}
                    </div>
                </main>

                {/* System Status / Queue (Hidden on smaller screens, can be toggled via Overlay on mobile or Layout shift on desktop) */}
                {isRightPanelOpen && (
                    <div className="hidden 2xl:block border-l border-white/5">
                        <RightPanel onClose={() => setIsRightPanelOpen(false)} />
                    </div>
                )}

            </div>

            {/* Control Surface (Footer) */}
            <PlayerBar
                isRightPanelOpen={isRightPanelOpen}
                onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
            />

        </div>
    );
};

export default DashboardLayout;
