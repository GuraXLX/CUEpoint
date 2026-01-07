import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

// Placeholder components
const SetlistArchitect = () => <div className="text-white p-6">Setlist Architect Module</div>
const TrackDoctor = () => <div className="text-white p-6">Track Doctor Module</div>
const Discovery = () => <div className="text-white p-6">Discovery Engine Module</div>
const Collab = () => <div className="text-white p-6">Collab Hub Module</div>

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
                                <Route path="/discovery" element={<Discovery />} />
                                <Route path="/collab" element={<Collab />} />
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
