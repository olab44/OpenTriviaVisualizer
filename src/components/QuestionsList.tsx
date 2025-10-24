import React from 'react'
import './QuestionsList.css'
import type { TriviaQuestion } from '../hooks/useFetchTrivia'

export const QuestionsList: React.FC<{ questions?: TriviaQuestion[] }> = ({ questions = [] }) => {

  return (
    <div className="questions-list">
      <h3>Questions</h3>
      <ul>
        {questions.length === 0 ? (
          <li>No questions available</li>
        ) : (
          questions.map((it, idx) => (
            <li key={idx}>
              <div className="q">{it.question}</div>
              <div className="a">{it.correct_answer}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
