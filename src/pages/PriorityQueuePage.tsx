import { useEffect, useState } from 'react'
import { ContentItem, fetchContent } from '../lib/api'
import VideoPlayer from '../components/VideoPlayer'
import PriorityQueueViz from '../components/PriorityQueueViz'

export default function PriorityQueuePage() {
  const [content, setContent] = useState<ContentItem | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchContent('priority-queue')
      .then(setContent)
      .catch(e => setError(String(e)))
  }, [])

  if (error) return <p style={{ color: 'crimson' }}>{error}</p>

  return (
    <div>
      <h1>Priority Queue</h1>
      {content && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <VideoPlayer youtubeUrl={content.videoUrl} />
        </div>
      )}
      <h3>Interactive Visualization</h3>
      <PriorityQueueViz />
    </div>
  )
}






