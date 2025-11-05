import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'
export const api = axios.create({ baseURL })

export type Topic = 'deque' | 'priority-queue'

export interface ContentItem {
  topic: Topic
  html: string
  videoUrl: string
  updatedAt: string
}

export interface QuizQuestionLite {
  id: string
  question: string
  choices: string[]
}

export interface QuizSubmitResponseItem {
  questionId: string
  correctIndex: number
  userIndex: number | null
  correct: boolean
  explanation: string
}

export async function fetchContent(topic: Topic) {
  const { data } = await api.get<ContentItem>(`/api/content/${topic}`)
  return data
}

export async function fetchQuiz(topic: Topic) {
  const { data } = await api.get<{ topic: Topic; questions: QuizQuestionLite[] }>(`/api/quiz/${topic}`)
  return data.questions
}

export async function submitQuiz(topic: Topic, answers: number[]) {
  const { data } = await api.post<{ score: number; total: number; breakdown: QuizSubmitResponseItem[] }>(`/api/quiz/submit`, { topic, answers })
  return data
}






