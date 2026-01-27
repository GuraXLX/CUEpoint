import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SetlistArchitect from './pages/SetlistArchitect'
import TrackDoctor from './pages/TrackDoctor'
import DiscoveryEngine from './pages/DiscoveryEngine'
import CollabHub from './pages/CollabHub'
import { AuthProvider } from './contexts/AuthContext'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Routes - Single Global Pro Layout */}
                    <Route
                        path="/*"
                        element={
                            <DashboardLayout>
                                <Routes>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/setlist-architect" element={<SetlistArchitect />} />
                                    <Route path="/track-doctor" element={<TrackDoctor />} />
                                    <Route path="/discovery" element={<DiscoveryEngine />} />
                                    <Route path="/collab" element={<CollabHub />} />
                                    {/* Default to Dashboard */}
                                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                                </Routes>
                            </DashboardLayout>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
