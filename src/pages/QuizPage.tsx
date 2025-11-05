import { useParams } from 'react-router-dom'
import Quiz from '../components/Quiz'

export default function QuizPage() {
  const params = useParams()
  const topic = (params.topic === 'deque' || params.topic === 'priority-queue') ? params.topic : null
  if (!topic) return <p>Invalid topic.</p>
  return (
    <div>
      <h1>{topic === 'deque' ? 'Deque' : 'Priority Queue'} Quiz</h1>
      <Quiz topic={topic} />
    </div>
  )
}






