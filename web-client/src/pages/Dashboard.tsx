import React from 'react'
import { Link } from 'react-router-dom'
import { MusicalNoteIcon, SparklesIcon, GlobeAltIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Welcome back, Producer</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Setlist Architect Card */}
                <div className="bg-card p-6 rounded-xl shadow-lg border border-white/5 hover:border-primary/50 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">Setlist Architect</h2>
                        <SparklesIcon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-gray-400 mb-6 h-12">Create the perfect journey. AI-powered track selection and harmonic mixing suggestions.</p>
                    <Link to="/setlist-architect" className="inline-flex items-center justify-center w-full bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-transparent px-4 py-2 rounded-lg transition-all font-medium">
                        Start Planning
                    </Link>
                </div>

                {/* Track Doctor Card */}
                <div className="bg-card p-6 rounded-xl shadow-lg border border-white/5 hover:border-secondary/50 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white group-hover:text-secondary transition-colors">Track Doctor</h2>
                        <MusicalNoteIcon className="h-6 w-6 text-secondary" />
                    </div>
                    <p className="text-gray-400 mb-6 h-12">Get detailed feedback on your mix. Analyze clarity, low-end, and dynamic range.</p>
                    <Link to="/track-doctor" className="inline-flex items-center justify-center w-full bg-secondary/10 hover:bg-secondary text-secondary hover:text-white border border-secondary/20 hover:border-transparent px-4 py-2 rounded-lg transition-all font-medium">
                        Analyze Track
                    </Link>
                </div>

                {/* Discovery Engine Card */}
                <div className="bg-card p-6 rounded-xl shadow-lg border border-white/5 hover:border-accent/50 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">Discovery Engine</h2>
                        <GlobeAltIcon className="h-6 w-6 text-accent" />
                    </div>
                    <p className="text-gray-400 mb-6 h-12">Find hidden gems. AI-curated tracks from unsigned artists tailored to your style.</p>
                    <Link to="/discovery" className="inline-flex items-center justify-center w-full bg-accent/10 hover:bg-accent text-accent hover:text-white border border-accent/20 hover:border-transparent px-4 py-2 rounded-lg transition-all font-medium">
                        Explore Music
                    </Link>
                </div>

                {/* Collab Hub Card */}
                <div className="bg-card p-6 rounded-xl shadow-lg border border-white/5 hover:border-green-500/50 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white group-hover:text-green-500 transition-colors">Collab Hub</h2>
                        <UserGroupIcon className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="text-gray-400 mb-6 h-12">Connect with vocalists and producers. Manage projects and share stems securely.</p>
                    <Link to="/collab" className="inline-flex items-center justify-center w-full bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white border border-green-500/20 hover:border-transparent px-4 py-2 rounded-lg transition-all font-medium">
                        Find Collaborators
                    </Link>
                </div>
            </div>
        </div>
    )
}
