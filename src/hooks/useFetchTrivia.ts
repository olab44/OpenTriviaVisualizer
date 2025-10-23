import { useState, useEffect, useCallback, useMemo } from 'react'

export type TriviaQuestion = {
  category: string
  type: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

type TriviaApiResponse = {
  response_code: number
  results: TriviaQuestion[]
}

const TRIVIA_API_URL = 'https://opentdb.com/api.php?amount=50'

export const useFetchTrivia = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const fetchQuestions = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(TRIVIA_API_URL, { signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      
      const data: TriviaApiResponse = await res.json()
      setQuestions(data.results || []) 
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg === 'AbortError') return 
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const c = new AbortController()
    fetchQuestions(c.signal)
    return () => c.abort()
  }, [fetchQuestions])

  const retry = useCallback(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const categories = useMemo(() => (
    Array.from(new Set(questions.map(q => q.category))).sort()
  ), [questions])

  const difficultyCounts = useMemo(() => {
    return questions.reduce((counts, q) => {
      const difficulty = q.difficulty
      if (Object.prototype.hasOwnProperty.call(counts, difficulty)) {
        counts[difficulty] += 1
      }
      return counts
    }, { easy: 0, medium: 0, hard: 0 } as Record<'easy' | 'medium' | 'hard', number>)
  }, [questions])

  return { questions, categories, difficultyCounts, loading, error, retry }
}
