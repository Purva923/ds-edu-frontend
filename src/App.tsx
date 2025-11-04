import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import DequePage from './pages/DequePage'
import PriorityQueuePage from './pages/PriorityQueuePage'
import QuizPage from './pages/QuizPage'

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, Arial, sans-serif', lineHeight: 1.4 }}>
      <nav style={{ display: 'flex', gap: 16, padding: 12, borderBottom: '1px solid #ddd' }}>
        <Link to="/">Home</Link>
        <Link to="/deque">Deque</Link>
        <Link to="/priority-queue">Priority Queue</Link>
        <Link to="/quiz/deque">Deque Quiz</Link>
        <Link to="/quiz/priority-queue">Priority Queue Quiz</Link>
      </nav>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deque" element={<DequePage />} />
          <Route path="/priority-queue" element={<PriorityQueuePage />} />
          <Route path="/quiz/:topic" element={<QuizPage />} />
        </Routes>
      </div>
    </div>
  )
}



