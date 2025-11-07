import { useEffect, useState } from 'react'
import { ContentItem, fetchContent } from '../lib/api'
import VideoPlayer from '../components/VideoPlayer'
import PriorityQueueViz from '../components/PriorityQueueViz'
import { Link } from 'react-router-dom'

export default function PriorityQueuePage() {
  const [content, setContent] = useState<ContentItem | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchContent('priority-queue')
      .then(setContent)
      .catch(e => setError(String(e)))
  }, [])

  if (error) return <p style={{ color: 'crimson', padding: '20px' }}>{error}</p>

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          marginBottom: '30px'
        }}>
          <h1 style={{
            fontSize: '42px',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Priority Queue (Binary Heap)
          </h1>
          {content && (
            <div>
              <div dangerouslySetInnerHTML={{ __html: content.html }} style={{
                fontSize: '18px',
                lineHeight: 1.8,
                color: '#333',
                marginBottom: '30px'
              }} />
              <VideoPlayer youtubeUrl={content.videoUrl} />
            </div>
          )}
        </div>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '32px',
            marginBottom: '20px',
            color: '#333'
          }}>
            Interactive Visualization
          </h2>
          <PriorityQueueViz />
        </div>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Ready to Test Your Knowledge?</h2>
          <Link to="/quiz/priority-queue" style={{
            display: 'inline-block',
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '18px',
            boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)'
          }}>
            Take Priority Queue Quiz
          </Link>
        </div>
      </div>
    </div>
  )
}






