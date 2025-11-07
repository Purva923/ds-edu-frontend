import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

interface QuizResult {
  _id: string;
  topic: string;
  score: number;
  total: number;
  completedAt: string;
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }
    if (user) {
      fetchResults();
    }
  }, [user, authLoading, navigate]);

  const fetchResults = async () => {
    try {
      const { data } = await api.get('/api/user/quiz-results');
      setResults(data.results || []);
    } catch (err) {
      console.error('Failed to fetch results:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-gradient">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const getTopicName = (topic: string) => {
    return topic === 'deque' ? 'Deque' : 'Priority Queue';
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen animated-gradient p-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-2xl shadow-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user.username}!</h1>
          <p className="text-white/80">View your quiz results and track your progress</p>
        </div>

        {results.length === 0 ? (
          <div className="glass rounded-2xl shadow-2xl p-8 text-center">
            <p className="text-white text-xl mb-4">No quiz results yet!</p>
            <p className="text-white/80 mb-6">Take a quiz to see your results here</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/quiz/deque')}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-all transform hover:scale-105"
              >
                Take Deque Quiz
              </button>
              <button
                onClick={() => navigate('/quiz/priority-queue')}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-all transform hover:scale-105"
              >
                Take Priority Queue Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Your Quiz Results</h2>
            {results.map((result) => (
              <div
                key={result._id}
                className="glass rounded-xl shadow-xl p-6 hover:scale-105 transition-transform"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {getTopicName(result.topic)} Quiz
                    </h3>
                    <p className="text-white/70">
                      Completed: {new Date(result.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-bold ${getScoreColor(result.score, result.total)}`}>
                      {result.score}/{result.total}
                    </p>
                    <p className="text-white/70">
                      {Math.round((result.score / result.total) * 100)}%
                    </p>
                  </div>
                </div>
                <div className="mt-4 w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(result.score / result.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
