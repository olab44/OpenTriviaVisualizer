import React, { useState, useMemo } from 'react'
import './App.css'
import { Layout } from './components/Layout'
import { CategoriesPanel } from './components/CategoriesPanel'
import { DistributionPanel } from './components/DistributionPanel'
import { QuestionsList } from './components/QuestionsList'
import { useFetchTrivia } from './hooks/useFetchTrivia'

const App: React.FC = () => {
  const { questions, categories } = useFetchTrivia()
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const filtered = useMemo(() => {
    if (!selectedCategory) return questions
    return questions.filter((q) => q.category === selectedCategory)
  }, [questions, selectedCategory])

return (
    <div className="app">
      <Layout>
        <header className="main-header">
          <h1>Open Trivia Dashboard</h1>
        </header>
        
        <div className="grid-row">
          <div className="left-col">
            <CategoriesPanel categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
            <DistributionPanel />
          </div>

          <div className="right-col">
            <QuestionsList questions={filtered} />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default App
