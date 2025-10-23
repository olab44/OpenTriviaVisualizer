import React from 'react'
import './QuestionsList.css'
import type { TriviaQuestion } from '../hooks/useFetchTrivia'

export const QuestionsList: React.FC<{ questions?: TriviaQuestion[] }> = ({ questions }) => {
  const mock: TriviaQuestion[] = new Array(8).fill(0).map((_, i) => ({
    category: 'Mock',
    type: 'multiple',
    difficulty: 'easy',
    question: `Random question ${i + 1}`,
    correct_answer: `Answer ${i + 1}`,
    incorrect_answers: [],
  }))

  const list: TriviaQuestion[] = questions && questions.length > 0 ? questions : mock

  return (
    <div className="questions-list">
      <h3>Questions</h3>
      <ul>
        {list.map((it, idx) => (
          <li key={idx}>
            <div className="q">{it.question}</div>
            <div className="a">{it.correct_answer}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
