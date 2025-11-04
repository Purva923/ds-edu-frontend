import { useEffect, useState } from 'react'
import { ContentItem, fetchContent } from '../lib/api'
import VideoPlayer from '../components/VideoPlayer'
import DequeViz from '../components/DequeViz'

export default function DequePage() {
  const [content, setContent] = useState<ContentItem | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchContent('deque')
      .then(setContent)
      .catch(e => setError(String(e)))
  }, [])

  if (error) return <p style={{ color: 'crimson' }}>{error}</p>

  return (
    <div>
      <h1>Deque</h1>
      {content && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <VideoPlayer youtubeUrl={content.videoUrl} />
        </div>
      )}
      <h3>Interactive Visualization</h3>
      <DequeViz />
    </div>
  )
}



