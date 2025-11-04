import { useEffect, useState } from 'react'
import { fetchQuiz, submitQuiz, Topic } from '../lib/api'

export default function Quiz({ topic }: { topic: Topic }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [questions, setQuestions] = useState<{ id: string; question: string; choices: string[] }[]>([])
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<null | { score: number; total: number; breakdown: any[] }>(null)

  useEffect(() => {
    setLoading(true)
    setResult(null)
    fetchQuiz(topic)
      .then(qs => {
        setQuestions(qs)
        setAnswers(qs.map(() => -1))
        setLoading(false)
      })
      .catch(e => {
        setError(String(e))
        setLoading(false)
      })
  }, [topic])

  const submit = async () => {
    try {
      const data = await submitQuiz(topic, answers)
      setResult(data)
    } catch (e: any) {
      setError(String(e))
    }
  }

  if (loading) return <p>Loading…</p>
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>

  return (
    <div>
      {questions.map((q, qi) => (
        <div key={q.id} style={{ padding: 12, border: '1px solid #eee', borderRadius: 8, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>{qi + 1}. {q.question}</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {q.choices.map((c, ci) => (
              <label key={ci} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="radio" name={`q-${q.id}`} checked={answers[qi] === ci} onChange={() => setAnswers(prev => prev.map((v, i) => i === qi ? ci : v))} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={submit} style={{ padding: '8px 12px' }}>Submit</button>
      {result && (
        <div style={{ marginTop: 16 }}>
          <h3>Score: {result.score} / {result.total}</h3>
          <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
            {result.breakdown.map((b, i) => (
              <div key={i} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
                <div>Q{i + 1}: {b.correct ? 'Correct' : 'Incorrect'}</div>
                <div>Correct option: {b.correctIndex + 1}</div>
                {b.userIndex !== null && <div>Your option: {b.userIndex + 1}</div>}
                <div style={{ color: '#555' }}>{b.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}



