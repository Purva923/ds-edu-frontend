import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '60px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          background: 'white',
          borderRadius: '30px',
          padding: '60px 40px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '48px',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            Data Structures Visualizer
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#666',
            textAlign: 'center',
            marginBottom: '40px',
            lineHeight: 1.6
          }}>
            Learn Double Ended Queue (Deque) and Priority Queue through interactive visuals, videos, and quizzes.
          </p>

          {!user && (
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <Link to="/register" style={{
                display: 'inline-block',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                marginRight: '12px',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}>
                Get Started
              </Link>
              <Link to="/login" style={{
                display: 'inline-block',
                padding: '16px 32px',
                background: 'white',
                color: '#667eea',
                border: '2px solid #667eea',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>
                Login
              </Link>
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            <div style={{
              padding: '30px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              color: 'white',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}>
              <h2 style={{ marginTop: 0, fontSize: '28px' }}>Deque</h2>
              <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '20px' }}>
                Double-ended queue with operations at both ends. Perfect for sliding window problems and palindrome checking.
              </p>
              <Link to="/deque" style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'white',
                color: '#667eea',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                marginRight: '10px'
              }}>
                Learn More
              </Link>
              <Link to="/quiz/deque" style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                border: '2px solid white'
              }}>
                Take Quiz
              </Link>
            </div>

            <div style={{
              padding: '30px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '20px',
              color: 'white',
              boxShadow: '0 10px 30px rgba(245, 87, 108, 0.3)'
            }}>
              <h2 style={{ marginTop: 0, fontSize: '28px' }}>Priority Queue</h2>
              <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '20px' }}>
                Binary heap implementation for efficient priority-based operations. Essential for Dijkstra's algorithm and task scheduling.
              </p>
              <Link to="/priority-queue" style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'white',
                color: '#f5576c',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                marginRight: '10px'
              }}>
                Learn More
              </Link>
              <Link to="/quiz/priority-queue" style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                border: '2px solid white'
              }}>
                Take Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}






