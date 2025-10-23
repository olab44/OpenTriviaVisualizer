import React, { useMemo } from 'react'
import './DistributionPanel.css'
import type { TriviaQuestion } from '../hooks/useFetchTrivia'

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts'

const BAR_COLORS = ['#4CAF50', '#36A2EB', '#FFCE56', '#9966FF', '#FF9F40', '#F44336']
const DIFFICULTY_COLORS = ['#4CAF50', '#FF9F40', '#F44336']

export const DistributionPanel: React.FC<{ questions?: TriviaQuestion[] }> = ({ questions = [] }) => {
  const categoryData = useMemo(() => {
    const map = new Map<string, number>()
    for (const q of questions) {
      map.set(q.category, (map.get(q.category) || 0) + 1)
    }
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [questions])

  const difficultyData = useMemo(() => {
    const counts = { easy: 0, medium: 0, hard: 0 }
    for (const q of questions) {
      if (q.difficulty === 'easy') counts.easy += 1
      else if (q.difficulty === 'medium') counts.medium += 1
      else if (q.difficulty === 'hard') counts.hard += 1
    }
    return [
      { name: 'Easy', value: counts.easy },
      { name: 'Medium', value: counts.medium },
      { name: 'Hard', value: counts.hard },
    ]
  }, [questions])

  return (
    <div className="distribution-panel">
      <div className="dist-card">
        <h4>Question Distribution by Category</h4>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" name="Ilość">
                {categoryData.map((_, index) => (
                  <Cell key={`bar-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dist-card">
        <h4>Question Difficulty Distribution</h4>
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={difficultyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
              {difficultyData.map((_, index) => (
                <Cell key={`cell-diff-${index}`} fill={DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length]} />
              ))}
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
