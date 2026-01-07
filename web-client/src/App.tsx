import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SetlistArchitect from './pages/SetlistArchitect'
import TrackDoctor from './pages/TrackDoctor'
import DiscoveryEngine from './pages/DiscoveryEngine'
import CollabHub from './pages/CollabHub'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* Protected Routes Wrapper */}
                <Route
                    path="/*"
                    element={
                        <Layout>
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/setlist-architect" element={<SetlistArchitect />} />
                                <Route path="/track-doctor" element={<TrackDoctor />} />
                                <Route path="/discovery" element={<DiscoveryEngine />} />
                                <Route path="/collab" element={<CollabHub />} />
                                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            </Routes>
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
