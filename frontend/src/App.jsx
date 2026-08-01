import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import LearningPage from './pages/LearningPage'
import DsaTrackerPage from './pages/DsaTrackerPage'
import JobTrackerPage from './pages/JobTrackerPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="learning" element={<LearningPage />} />
          <Route path="dsa" element={<DsaTrackerPage />} />
          <Route path="jobs" element={<JobTrackerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}