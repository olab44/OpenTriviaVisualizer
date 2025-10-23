import React from 'react'
import './App.css'
import { useFetchTrivia } from './hooks/useFetchTrivia'

export const App: React.FC = () => {
  const { questions, loading, error } = useFetchTrivia()

  return (
    <div className="app">
      <header className="app-header">
        <h1> Open Trivia Dashboard</h1>
      </header>

      <main className="app-main">
        {loading && (
          <div className="loading">Loading ...</div>
        )}

        {error && (
          <div className="error">
            <p>Error: {error}</p>
            <div style={{ marginTop: 10 }}>
            </div>
          </div>
        )}

        {!loading && !error && (
          <section className="data-preview">
            <p>Number of questions: {questions.length}</p>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>
                {JSON.stringify(questions, null, 2)}
              </pre>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
