import { useEffect, useState } from 'react'
import { fetchQuiz, submitQuiz, Topic } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Quiz({ topic }: { topic: Topic }) {
  const { user } = useAuth()
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-gradient">
        <div className="text-white text-xl">Loading quiz...</div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-gradient">
        <div className="glass rounded-2xl shadow-2xl p-8 text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
        </div>
      </div>
    )
  }

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 80) return 'text-green-500'
    if (percentage >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="min-h-screen animated-gradient p-6">
      <div className="max-w-4xl mx-auto">
        {!result ? (
          <>
            {!user && (
              <div className="glass rounded-xl shadow-xl p-6 mb-6 text-center">
                <p className="text-white mb-4">💡 Login to save your quiz results!</p>
                <Link to="/login" className="text-white font-bold hover:underline">
                  Login here
                </Link>
              </div>
            )}
            <div className="glass rounded-2xl shadow-2xl p-8 mb-6">
              <h2 className="text-3xl font-bold text-white mb-6">
                {topic === 'deque' ? 'Deque' : 'Priority Queue'} Quiz
              </h2>
              <p className="text-white/80 mb-6">Answer all {questions.length} questions</p>
            </div>
            {questions.map((q, qi) => (
              <div key={q.id} className="glass rounded-xl shadow-xl p-6 mb-6">
                <div className="text-xl font-bold text-white mb-4">
                  Question {qi + 1}: {q.question}
                </div>
                <div className="space-y-3">
                  {q.choices.map((c, ci) => (
                    <label
                      key={ci}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                        answers[qi] === ci
                          ? 'bg-white/30 border-2 border-white'
                          : 'bg-white/10 border-2 border-transparent hover:bg-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={answers[qi] === ci}
                        onChange={() => setAnswers(prev => prev.map((v, i) => i === qi ? ci : v))}
                        className="mr-4 w-5 h-5 cursor-pointer"
                      />
                      <span className="text-white">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-center">
              <button
                onClick={submit}
                disabled={answers.some(a => a === -1)}
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
              >
                Submit Quiz
              </button>
            </div>
          </>
        ) : (
          <div className="glass rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">Quiz Complete! 🎉</h2>
              <p className={`text-5xl font-bold mb-2 ${getScoreColor(result.score, result.total)}`}>
                {result.score} / {result.total}
              </p>
              <p className="text-white/80 text-xl">
                {Math.round((result.score / result.total) * 100)}% Correct
              </p>
            </div>
            <div className="space-y-4 mb-6">
              {result.breakdown.map((b, i) => (
                <div
                  key={i}
                  className={`glass rounded-xl p-6 ${
                    b.correct ? 'border-2 border-green-500' : 'border-2 border-red-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold">Question {i + 1}</span>
                    <span className={`font-bold ${b.correct ? 'text-green-400' : 'text-red-400'}`}>
                      {b.correct ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <div className="text-white/80 mb-2">
                    Correct answer: Option {b.correctIndex + 1}
                  </div>
                  {b.userIndex !== null && (
                    <div className="text-white/80 mb-2">
                      Your answer: Option {b.userIndex + 1}
                    </div>
                  )}
                  <div className="text-white/90 mt-3 p-3 bg-white/10 rounded-lg">
                    {b.explanation}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <Link
                to={`/quiz/${topic}`}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-all"
              >
                Retake Quiz
              </Link>
              <Link
                to="/dashboard"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-all"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
