import { useState, useEffect } from 'react'
import axios from 'axios'

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

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get<TriviaApiResponse>(TRIVIA_API_URL, {
          signal: controller.signal,
        })
        setQuestions(response.data.results || [])
      } catch (err) {
        if (axios.isCancel(err)) {
          return
        }
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [])

  return { questions, loading, error }
}