import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import DequePage from './pages/DequePage'
import PriorityQueuePage from './pages/PriorityQueuePage'
import QuizPage from './pages/QuizPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function NavBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '16px 20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
          DS Visualizer
        </Link>
        <Link to="/deque" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background 0.2s' }}>
          Deque
        </Link>
        <Link to="/priority-queue" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background 0.2s' }}>
          Priority Queue
        </Link>
        <Link to="/quiz/deque" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background 0.2s' }}>
          Deque Quiz
        </Link>
        <Link to="/quiz/priority-queue" style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background 0.2s' }}>
          Priority Queue Quiz
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px' }}>
              Dashboard
            </Link>
            <span style={{ color: 'white' }}>{user.username}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px' }}>
              Login
            </Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', background: 'rgba(255,255,255,0.3)', borderRadius: '6px', fontWeight: 'bold' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

function AppContent() {
  return (
    <div style={{ fontFamily: 'system-ui, Arial, sans-serif', lineHeight: 1.4, minHeight: '100vh', background: '#f5f7fa' }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deque" element={<DequePage />} />
        <Route path="/priority-queue" element={<PriorityQueuePage />} />
        <Route path="/quiz/:topic" element={<QuizPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}






